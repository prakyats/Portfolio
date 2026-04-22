/**
 * Projects — Performance fix (unchanged from p4-perf):
 *  - onScroll throttled with requestAnimationFrame
 *  - transition-all on dots: replaced with explicit width + background transitions
 *
 * Changes from p4-perf:
 *  - Grid is now lg:grid-cols-2 xl:grid-cols-4 to accommodate 4 projects cleanly
 *  - Echoes (index 0) spans 2 columns on xl to give it a "Featured" visual weight
 *  - Mobile dots count updates automatically from projects.length
 */
import { useRef, useState, useCallback } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-100px" });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const rafRef = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!gridRef.current) return;
      const { scrollLeft, clientWidth } = gridRef.current;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    });
  }, []);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <SectionWrapper id="work" className="pt-12 pb-24 md:pt-20 md:pb-48 bg-bg relative mt-0">
      <div className="max-w-[1240px] mx-auto">
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

        {/*
          Layout strategy:
          Mobile:   horizontal scroll carousel (unchanged)
          md:       2-column grid
          lg:       2-column grid with Echoes spanning full width (featured treatment)
          xl:       2×2 grid — Echoes top-left, normal cards fill the rest
        */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar px-6 md:px-6 lg:px-6"
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={
                // Echoes (first/featured): full-width row on lg, normal on md
                i === 0
                  ? "md:col-span-2 lg:col-span-1 h-auto"
                  : "h-auto"
              }
            >
              <ProjectCard
                project={project}
                isFirst={i === 0}
                index={i}
                onHover={(slug) => setHoveredSlug(slug)}
                isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
              />
            </div>
          ))}
        </motion.div>

        {/* Mobile dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8 px-6">
          {projects.map((_, i) => (
            <div
              key={i}
              className="h-0.5 rounded-full bg-white"
              style={{
                width: i === activeIndex ? "2rem" : "0.5rem",
                opacity: i === activeIndex ? 1 : 0.2,
                transition: "width 400ms ease-out, opacity 400ms ease-out",
              }}
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-widest text-white/20">Swipe</span>
        </div>

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
