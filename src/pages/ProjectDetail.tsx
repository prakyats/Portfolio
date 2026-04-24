import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../data/projects";
import { motion, Variants } from "framer-motion";

const revealItem: Variants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Section = ({
  title,
  content,
  children,
  color = "bg-white",
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
  color?: string;
}) => (
  <motion.section
    variants={revealItem}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-5%" }}
    className={`p-8 md:p-12 border-4 border-black shadow-hard-md ${color} mb-8`}
  >
    <div className="flex items-center gap-4 mb-6">
      <span className="font-display font-black uppercase text-xs tracking-[0.3em] bg-black text-white px-3 py-1.5">
        {title}
      </span>
      <div className="flex-1 h-[3px] bg-black/10" />
    </div>
    {content && (
      <p className="font-display font-bold text-lg md:text-xl leading-snug text-black/80">
        {content}
      </p>
    )}
    {children}
  </motion.section>
);

const ProjectDetail = () => {
  const { slug }   = useParams<{ slug: string }>();
  const navigate   = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const project     = projects.find((p) => p.slug === slug);
  const currentIdx  = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-bg text-black flex flex-col items-center justify-center p-6 font-display font-black uppercase">
        <h1 className="text-4xl mb-8">Project not found</h1>
        <Link
          to="/"
          className="bg-bauhaus-red text-white px-8 py-4 border-4 border-black shadow-hard-sm font-display font-black uppercase text-sm"
        >
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen bg-bg text-black selection:bg-bauhaus-yellow pb-24"
    >
      {/* Sticky top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-display font-black uppercase text-sm tracking-tighter hover:text-bauhaus-red transition-colors duration-200 flex items-center gap-2"
        >
          ← Back to Portfolio
        </Link>
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 bg-bauhaus-red" />
          <div className="w-3.5 h-3.5 bg-bauhaus-blue rounded-full" />
          <div className="w-3.5 h-3.5 bg-bauhaus-yellow bauhaus-triangle" />
        </div>
      </nav>

      {/* Hero header */}
      <header className="pt-[88px] pb-16 px-6 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-4xl">
              <span className="section-label">Case Study</span>
              <h1 className="text-display-massive">{project.title}</h1>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="flex gap-3">
                {project.live && (
                  <a
                    href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bauhaus-red text-white px-5 py-3 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase text-xs tracking-widest"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-5 py-3 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase text-xs tracking-widest"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Image + tech stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border-4 border-black aspect-video overflow-hidden shadow-hard-lg">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-display font-black text-[10px] uppercase tracking-widest opacity-40 mb-1">
                Tech Stack
              </p>
              {project.tech.map((t, i) => (
                <div
                  key={t}
                  className={`px-5 py-4 border-4 border-black font-display font-black uppercase tracking-widest text-sm shadow-hard-sm
                    ${i % 3 === 0 ? "bg-bauhaus-red text-white" : i % 3 === 1 ? "bg-bauhaus-blue text-white" : "bg-bauhaus-yellow text-black"}`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* One-line impact summary */}
          <div className="mt-8 bg-bauhaus-yellow border-4 border-black p-6 shadow-hard-sm">
            <p className="font-display font-bold text-sm uppercase tracking-widest opacity-60 mb-1">What this demonstrates</p>
            <p className="font-display font-black text-lg uppercase tracking-tight">{project.impact}</p>
          </div>
        </div>
      </header>

      {/* Details */}
      <main className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Section title="Problem"  content={project.details.problem}  color="bg-white" />
            <Section title="Approach" content={project.details.approach} color="bg-[#F5F5F5]" />
            <Section title="Solution" content={project.details.solution} color="bg-white" />
          </div>
          <div className="lg:col-span-4">
            <Section title="Key Features" color="bg-bauhaus-blue text-white">
              <ul className="space-y-5">
                {project.details.features.map((feature, i) => (
                  <li key={i} className="font-display font-bold text-base border-l-4 border-white pl-4 py-1 leading-snug">
                    {feature}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Impact" content={project.details.impact} color="bg-bauhaus-red text-white" />
          </div>
        </div>

        {/* Next / Prev navigation — actually works */}
        <div className="mt-20 pt-10 border-t-4 border-black grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.slug}`}
              className="group flex items-center gap-4 bg-white border-4 border-black p-6 shadow-hard-sm hover:shadow-hard-md card-hover"
            >
              <span className="font-display font-black text-2xl">←</span>
              <div>
                <p className="font-display font-bold text-[10px] uppercase tracking-widest opacity-40 mb-1">Previous</p>
                <p className="font-display font-black text-xl uppercase tracking-tighter group-hover:text-bauhaus-red transition-colors">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              to={`/project/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 bg-white border-4 border-black p-6 shadow-hard-sm hover:shadow-hard-md card-hover text-right"
            >
              <div>
                <p className="font-display font-bold text-[10px] uppercase tracking-widest opacity-40 mb-1">Next</p>
                <p className="font-display font-black text-xl uppercase tracking-tighter group-hover:text-bauhaus-blue transition-colors">{nextProject.title}</p>
              </div>
              <span className="font-display font-black text-2xl">→</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="group flex items-center justify-end gap-4 bg-bauhaus-yellow border-4 border-black p-6 shadow-hard-sm hover:shadow-hard-md card-hover text-right"
            >
              <div>
                <p className="font-display font-bold text-[10px] uppercase tracking-widest opacity-60 mb-1">You've seen it all</p>
                <p className="font-display font-black text-xl uppercase tracking-tighter">Back to Portfolio</p>
              </div>
              <span className="font-display font-black text-2xl">↑</span>
            </Link>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default ProjectDetail;
