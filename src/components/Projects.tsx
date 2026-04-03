import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px", once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <SectionWrapper id="work" className="py-24 md:py-48 bg-bg relative mt-12 md:mt-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="projects-header mb-16 lg:mb-24">
          <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] block mb-4">
            Selected Work
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-snug text-white max-w-[600px] mb-4">
            Systems I’ve built to solve real-world problems.
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-[600px] leading-relaxed">
            Focused on reliability, performance, and actual usage — not just demos.
          </p>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              isFirst={i === 0}
            />
          ))}
        </motion.div>
        
        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-xs md:text-sm text-muted/50 uppercase tracking-[0.2em]">
            More projects coming as I continue building and learning.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
