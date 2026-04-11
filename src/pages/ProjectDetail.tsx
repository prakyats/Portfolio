import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../data/projects";
import { motion, Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Section = ({ title, content, children }: { title: string; content?: string; children?: React.ReactNode }) => (
  <motion.section 
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10% 0px" }}
    className="py-12 md:py-16 border-t border-white/5 first:border-t-0"
  >
    <h2 className="text-xs uppercase tracking-[0.2em] text-muted mb-8 font-medium">
      {title}
    </h2>
    {content && (
      <p className="text-lg md:text-xl text-text/80 leading-relaxed font-light">
        {content}
      </p>
    )}
    {children}
  </motion.section>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[100svh] bg-bg text-text flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-display mb-8">Project not found</h1>
        <Link to="/" className="text-muted hover:text-text transition-colors">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-surface/50 overflow-x-hidden">
      <div className="max-w-[800px] mx-auto px-6 py-24 md:py-32">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted hover:text-text transition-colors mb-20 md:mb-32 group"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </Link>

        <motion.header 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          className="mb-24 md:mb-32"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-text leading-[1.1] tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed font-light mb-10">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-surface/30 border border-white/5 rounded-full text-[10px] md:text-xs text-muted tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
            
            {project.live && (
              <a 
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-white/60 hover:text-white transition-colors group"
              >
                <span className="border-b border-white/20 group-hover:border-white transition-colors">Live Demo</span>
                <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            )}
          </div>
        </motion.header>

        <div className="space-y-4">
          <Section title="Problem" content={project.details.problem} />
          
          <Section title="Approach" content={project.details.approach} />
          
          <Section title="Solution" content={project.details.solution} />
          
          <Section title="Key Features">
            <ul className="grid grid-cols-1 gap-4">
              {project.details.features.map((feature, i) => (
                <li key={i} className="text-lg md:text-xl text-text/80 leading-relaxed font-light flex items-start">
                  <span className="mr-4 text-muted mt-2.5 w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </Section>
          
          <Section title="Impact" content={project.details.impact} />

          <motion.section 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-16 md:py-24 border-t border-white/5 flex flex-wrap gap-8"
          >
            {project.live && project.live !== "#" && (
              <a 
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-sm border-b border-text/20 pb-1 hover:border-text transition-colors font-medium tracking-wide"
              >
                Live Project ↗
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm border-b border-text/20 pb-1 hover:border-text transition-colors font-medium tracking-wide"
              >
                GitHub Repository ↗
              </a>
            )}
          </motion.section>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
