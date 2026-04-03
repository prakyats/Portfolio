import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Project } from "../data/projects";

export const ProjectCard = ({
  project,
  isActive,
  isDimmed,
  isFirst,
  onMouseEnter,
  onMouseLeave
}: {
  project: Project;
  isActive: boolean;
  isDimmed: boolean;
  isFirst?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const shiftX = ((e.clientX - centerX) / (rect.width / 2)) * 6;
    const shiftY = ((e.clientY - centerY) / (rect.height / 2)) * 6;

    x.set(shiftX);
    y.set(shiftY);
  };

  const internalHandleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onMouseLeave();
  };

  return (
    <Link to={`/project/${project.slug}`} className="block h-full outline-none">
      <motion.div
        onMouseEnter={onMouseEnter}
        onMouseLeave={internalHandleMouseLeave}
        initial={{ scale: 1, y: 0, opacity: 1, borderColor: "rgba(255,255,255,0.05)" }}
        animate={{
          scale: isActive ? 1.02 : isDimmed ? 0.98 : 1,
          y: isActive ? -4 : 0,
          opacity: isDimmed ? 0.6 : 1,
          borderColor: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.4, ease: "easeOut", ...(isFirst ? { delay: 0.2 } : {}) }}
        className={`project-card group relative bg-surface/30 rounded-[24px] overflow-hidden border border-white/10 flex flex-col h-full cursor-pointer shadow-sm transform-gpu will-change-transform ${isFirst ? 'scale-[1.01]' : ''}`}
      >
        <div
          className="aspect-video overflow-hidden relative shrink-0"
          onMouseMove={handleMouseMove}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{ scale: isActive ? 1.03 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: smoothX, y: smoothY }}
            className="w-full h-full object-cover will-change-transform scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="p-8 md:p-10 flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-medium tracking-tight text-white mb-1">
            {project.title}
          </h3>

          <p className="text-white/50 text-sm font-medium tracking-tight mb-4">
            {project.technicalImpact}
          </p>

          <p className="text-white/70 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/40 text-[10px] md:text-sm tracking-wide font-medium">
            {project.tech.map((t, idx) => (
              <span key={t} className="flex items-center">
                {t}
                {idx < project.tech.length - 1 && <span className="ml-2 opacity-30">•</span>}
              </span>
            ))}
          </div>

          <div className="flex mt-8">
            <span className="relative group/cta inline-flex items-center gap-2 text-xs md:text-sm text-white/80 font-medium hover:text-white transition group-hover:text-white duration-300">
              <span className="relative pb-0.5">
                View Project
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white/60 origin-left scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-300 ease-out" />
              </span>
              <span className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
