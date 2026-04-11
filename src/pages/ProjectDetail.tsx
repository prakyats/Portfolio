import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../data/projects";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: 0.8 
    }
  }
};

const Section = ({ title, content, children }: { title: string; content?: string; children?: React.ReactNode }) => (
  <motion.section 
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-5% 0px" }}
    className="py-10 md:py-14 border-t border-white/5 first:border-t-0"
  >
    <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted mb-6 font-medium">
      {title}
    </h2>
    {content && (
      <p className="text-lg md:text-xl text-text/80 leading-relaxed font-light text-pretty">
        {content}
      </p>
    )}
    {children}
  </motion.section>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { scrollY } = useScroll();
  
  // Parallax for the hero image
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  useEffect(() => {
    // Instant jump to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as any // Force instant scroll
    });
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg text-text selection:bg-surface/50 overflow-x-hidden relative flex flex-col"
    >
      {/* Hero Header Image */}
      <div className="w-full h-[40vh] md:h-[45vh] lg:h-[50vh] relative overflow-hidden bg-surface/10 ring-1 ring-white/5 shadow-2xl">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 transform-gpu will-change-transform"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            fetchPriority="high"
            className="w-full h-full object-cover brightness-[0.85] saturate-[1.1] transform-gpu"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />
        </motion.div>
        
        <div className="max-w-[1200px] mx-auto px-6 h-full relative z-20 pointer-events-none flex items-end pb-12">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="absolute top-8 left-4 md:top-12 md:left-6 z-30 pointer-events-auto"
           >
             <Link 
              to="/" 
              className="inline-flex items-center text-xs md:text-sm text-white/50 hover:text-white transition-colors group backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              Back to Work
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-12 md:py-16 w-full">
        <motion.header 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display text-text leading-[1.1] tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed font-light mb-10 text-balance">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-6">
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
                href={project.live.startsWith('http') ? project.live : `https://${project.live}`}
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
            className="py-12 md:py-16 border-t border-white/5 flex flex-wrap gap-8"
          >
            {project.live && project.live !== "#" && (
              <a 
                href={project.live.startsWith('http') ? project.live : `https://${project.live}`}
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
    </motion.div>
  );
};

export default ProjectDetail;
