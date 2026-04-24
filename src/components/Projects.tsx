import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";

const Projects = () => {
  return (
    <SectionWrapper id="work" className="bg-white py-24 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b-4 border-black pb-12">
          <div className="max-w-2xl">
            <span className="section-label">Selected Work</span>
            <h2 className="text-display-large">
              PROJECTS<br />
              <span className="italic text-bauhaus-blue">I'VE BUILT.</span>
            </h2>
          </div>
          <p className="font-display font-bold text-sm uppercase tracking-widest text-black/40 max-w-xs text-right hidden md:block">
            Click any project to view the full case study
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border-4 border-black bg-bauhaus-yellow p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-hard-md"
        >
          <div>
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">
              Available for Internships
            </h3>
            <p className="font-display font-bold text-sm text-black/60 uppercase tracking-tight">
              Open to full-stack and backend roles — let's build something real.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-black text-white px-10 py-4 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase tracking-widest text-sm whitespace-nowrap"
          >
            Get In Touch →
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
