import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-24 md:py-48 bg-bg relative">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="projects-header mb-16 lg:mb-24">
          <span className="text-[10px] md:text-xs text-muted/70 uppercase tracking-[0.3em] block mb-4">
            PROJECTS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text font-light tracking-tight">
            Selected Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              isActive={hoveredIndex === i}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-xs md:text-sm text-muted/50 uppercase tracking-[0.2em]">
            More projects coming as I continue building and learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
