/**
 * ProjectCard — unchanged performance fixes from p4-perf, plus:
 *  - badge prop support (renders "Featured" / "NEW" pill)
 *  - Featured card gets a subtle purple accent glow instead of white
 *  - Tech tag overflow capped at 4 with "+N more" indicator
 */
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
  const isFeatured = !!project.badge;
  const visibleTech = project.tech.slice(0, 4);
  const extraTech   = project.tech.length - visibleTech.length;
  const projectColor = project.color || "22, 90%, 62%"; // fallback to accent

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
      className="h-auto md:h-full group shrink-0 w-[85vw] md:w-full snap-center"
      style={{
        opacity: isDimmed ? 0.2 : 1,
        transform: isDimmed ? "scale(0.98)" : "scale(1)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      }}
      onMouseEnter={() => onHover?.(project.slug)}
      onMouseLeave={() => onHover?.(null)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className={`border-gradient relative rounded-[24px] overflow-hidden flex flex-col h-full shadow-lg transform-gpu card-lift backdrop-blur-sm ${
          isFirst ? "scale-[1.01]" : ""
        }`}
        style={{
          background: `linear-gradient(to bottom right, hsla(${projectColor}, 0.05), transparent), hsla(222, 20%, 8%, 0.7)`,
        }}
      >
        {/* Dynamic Glow Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-[24px]"
          style={{
            boxShadow: `inset 0 0 60px hsla(${projectColor}, 0.05)`,
          }}
        />

        {/* Spotlight */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), hsla(${projectColor}, 0.15), transparent 60%)`,
          }}
        />

        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Link
          to={`/project/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${project.title}`}
        />

        {/* Image */}
        <div className="aspect-video overflow-hidden relative shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover scale-[1.03] group-hover:scale-100 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[hsla(222,20%,8%,0.7)]" />

          {/* Badge — "Featured" or index number */}
          {isFeatured ? (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[hsla(248,100%,70%,0.18)] border border-[hsla(248,100%,70%,0.35)] backdrop-blur-none">
              <span className="text-[10px] text-[hsl(248,100%,80%)] font-semibold tracking-widest uppercase">
                {project.badge}
              </span>
            </div>
          ) : (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
              <span className="text-[10px] text-white/60 font-medium">{String(index + 1).padStart(2, "0")}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 pointer-events-none">
          <h3 className="font-display text-xl md:text-2xl font-normal text-white tracking-tight mb-2">
            {project.title}
          </h3>

          <p className="text-xs font-medium tracking-wide mb-3 uppercase opacity-90" style={{ color: `hsla(${projectColor}, 0.85)` }}>
            {project.technicalImpact}
          </p>

          <p className="text-white/55 leading-relaxed text-sm text-pretty mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech tags — capped at 4 */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {visibleTech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
            {extraTech > 0 && (
              <span className="tech-tag opacity-50">+{extraTech}</span>
            )}
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

            {project.github && !project.live && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="animated-underline inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
