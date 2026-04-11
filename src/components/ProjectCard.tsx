import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Project } from "../data/projects";

export const ProjectCard = ({
  project,
  isFirst,
  isDimmed,
  onHover,
}: {
  project: Project;
  isFirst?: boolean;
  isDimmed?: boolean;
  onHover?: (slug: string | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      className={`h-auto md:h-full group transition-all duration-500 ease-out shrink-0 w-[85vw] md:w-full snap-center ${isDimmed ? 'opacity-20 scale-[0.98] blur-[1px]' : 'opacity-100 scale-100'}`}
      onMouseEnter={() => onHover?.(project.slug)}
      onMouseLeave={() => onHover?.(null)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className={`project-card relative bg-surface/30 rounded-[24px] overflow-hidden border border-white/10 flex flex-col h-full shadow-sm transform-gpu will-change-transform ${isFirst ? 'scale-[1.01]' : ''}`}
      >
        {/* Spotlight Layer */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
             }}
        />

        <Link 
          to={`/project/${project.slug}`} 
          className="absolute inset-0 z-10"
          aria-label={`View details for ${project.title}`}
        />
        
        <div className="aspect-video overflow-hidden relative shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="p-8 md:p-10 flex flex-col flex-grow relative z-20 pointer-events-none">
          <h3 className="text-lg md:text-xl font-medium tracking-tight text-white mb-1">
            {project.title}
          </h3>

          <p className="text-white/50 text-sm font-medium tracking-tight mb-4 text-balance">
            {project.technicalImpact}
          </p>

          <p className="text-white/70 leading-relaxed text-pretty">
            {project.description}
          </p>

          <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/40 text-[10px] md:text-sm tracking-wide font-medium">
            {project.tech.map((t, idx) => (
              <span key={t} className="flex items-center">
                {t}
                {idx < project.tech.length - 1 && <span className="ml-2 opacity-30">•</span>}
              </span>
            ))}
          </div>

          <div className="flex mt-8 gap-6 z-30 relative pointer-events-none">
            <span className="relative inline-flex items-center gap-2 text-xs md:text-sm text-white/80 font-medium group-hover:text-white transition duration-300">
              <span className="relative pb-0.5">
                View Project
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </span>

            {project.live && (
              <a 
                href={project.live.startsWith('http') ? project.live : `https://${project.live}`}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-2 text-xs md:text-sm text-white/40 hover:text-white transition duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="relative pb-0.5">
                  Live Demo
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white/60 origin-left scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out" />
                </span>
                <span className="text-[10px] mb-1">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
