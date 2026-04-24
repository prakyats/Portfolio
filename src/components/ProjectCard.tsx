import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Project } from "../data/projects";

export const ProjectCard = ({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) => {
  const isFeatured = !!project.badge;
  const visibleTech = project.tech.slice(0, 3);

  const accentColors = ["bg-bauhaus-red", "bg-bauhaus-blue", "bg-bauhaus-yellow"];
  const cardAccent = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="group relative flex flex-col h-full bg-white border-4 border-black shadow-hard-md card-hover"
    >
      {/* Corner accent — Bauhaus signature */}
      <div className={`absolute -top-[3px] -right-[3px] w-7 h-7 border-4 border-black ${cardAccent} z-20 pointer-events-none`} />

      <Link
        to={`/project/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${project.title} case study`}
      />

      {/* Image — specific transitions only, not transition-all */}
      <div className="aspect-[16/10] overflow-hidden border-b-4 border-black relative">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.04] group-hover:scale-100"
          style={{ transition: "filter 400ms ease, transform 400ms ease" }}
          loading="lazy"
          decoding="async"
        />
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-bauhaus-yellow text-black border-2 border-black px-3 py-1 font-display font-black text-[10px] uppercase tracking-widest shadow-hard-sm z-10">
            Featured
          </div>
        )}
        {/* Index */}
        <div className="absolute bottom-3 right-4 font-display font-black text-white text-2xl opacity-30">
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none mb-2 group-hover:text-bauhaus-red" style={{ transition: "color 200ms ease" }}>
          {project.title}
        </h3>

        <p className="text-xs font-bold uppercase tracking-widest text-bauhaus-blue mb-3 leading-tight">
          {project.technicalImpact.split("·")[0].trim()}
        </p>

        <p className="text-black/65 leading-relaxed text-sm mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-5 border-t-2 border-black/10">
          {visibleTech.map((t) => (
            <span key={t} className="bg-black text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="border-2 border-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* CTA row — always visible so users know the card is clickable */}
      <div className="px-6 md:px-8 pb-6 flex items-center justify-between">
        <span className="font-display font-black text-xs uppercase tracking-widest text-black/40 group-hover:text-bauhaus-red" style={{ transition: "color 200ms ease" }}>
          View Case Study
        </span>
        <span className="font-display font-black text-xl group-hover:translate-x-1" style={{ transition: "transform 200ms ease" }}>→</span>
      </div>
    </motion.div>
  );
};
