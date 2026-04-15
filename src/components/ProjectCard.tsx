import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Project } from "../data/projects";

export const ProjectCard = ({
  project,
  isFirst,
  isDimmed,
  onHover,
  index = 0,
}: {
  project: Project;
  isFirst?: boolean;
  isDimmed?: boolean;
  onHover?: (slug: string | null) => void;
  index?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  return (
    <div
      className={`h-auto md:h-full group transition-all duration-500 ease-out shrink-0 w-[85vw] md:w-full snap-center ${
        isDimmed ? "opacity-20 scale-[0.98] blur-[1px]" : "opacity-100 scale-100"
      }`}
      onMouseEnter={() => onHover?.(project.slug)}
      onMouseLeave={() => onHover?.(null)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className={`border-gradient relative bg-surface/30 rounded-[24px] overflow-hidden flex flex-col h-full shadow-lg transform-gpu will-change-transform backdrop-blur-sm ${
          isFirst ? "scale-[1.01]" : ""
        }`}
        style={{ background: "hsla(222, 20%, 8%, 0.7)" }}
      >
        {/* Spotlight */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.05), transparent 40%)`,
          }}
        />

        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Link
          to={`/project/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${project.title}`}
        />

        {/* Image */}
        <div className="aspect-video overflow-hidden relative shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform scale-[1.03] group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[hsla(222,20%,8%,0.7)]" />
          {/* Number badge */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
            <span className="text-[10px] text-white/60 font-medium">{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 pointer-events-none">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-xl md:text-2xl font-normal text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-[hsl(var(--accent))] text-xs font-medium tracking-wide mb-3 uppercase opacity-80">
            {project.technicalImpact}
          </p>

          <p className="text-white/55 leading-relaxed text-sm text-pretty mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 z-30 relative pointer-events-none">
            <span className="animated-underline relative inline-flex items-center gap-2 text-sm text-white/70 font-medium group-hover:text-white transition-colors duration-300">
              View Project
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </span>

            {project.live && (
              <a
                href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
                target="_blank"
                rel="noreferrer"
                className="animated-underline inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                Live
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
