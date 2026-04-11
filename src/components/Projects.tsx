import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px", once: true });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <SectionWrapper id="work" className="py-24 md:py-48 bg-bg relative mt-12 md:mt-16">
      <div className="max-w-[1240px] mx-auto">
        <div className="projects-header mb-16 lg:mb-24 px-6">
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
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar px-6 md:px-0"
        >
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              isFirst={i === 0}
              onHover={(slug) => setHoveredSlug(slug)}
              isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
            />
          ))}
        </motion.div>

        {/* Swipe Indicators (Mobile Only) */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8 px-6">
          {projects.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Swipe
          </span>
        </div>
        
        <div className="mt-24 pt-12 mx-6 border-t border-white/5 text-center">
          <p className="text-xs md:text-sm text-muted/50 uppercase tracking-[0.2em]">
            More projects coming as I continue building and learning.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
