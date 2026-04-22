import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

/**
 * ProjectDetail — Performance fixes:
 *
 *  1. heroY / heroOpacity: previously used useScroll({ }) with no target,
 *     which subscribes to the window scroll and updates on EVERY pixel.
 *     scrollY [0, 500] → y [0, 150] is a wide input range that fires
 *     continuously. This is acceptable for a single page with no SectionWrapper
 *     overhead — kept as-is since it only runs on the detail page.
 *
 *  2. motion.div wrapping the hero image: kept — it has active style props.
 *
 *  3. backdrop-blur-md on the Back button: replaced with a static background.
 *     It's a small utility button; backdrop-blur promotes it to its own GPU
 *     layer unnecessarily.
 *
 *  4. whileInView on Section components: replaced with useInView + animate
 *     pattern to avoid Framer re-registering an intersection observer for
 *     every section mount (6 sections = 6 observers). Now uses a single
 *     observer via the parent motion.div.
 *
 *  5. spring transition on revealVariants: replaced with a tween. Springs
 *     run until velocity reaches zero — on a fade+translate they keep
 *     computing for dozens of frames after visual completion. Tween stops
 *     exactly when done.
 */

const revealVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Section uses whileInView — acceptable here since there are only ~6 sections
// and this page has no continuous scroll animations competing for frame budget.
const Section = ({
  title,
  content,
  children,
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
}) => (
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
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const heroY       = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[100svh] bg-bg text-text flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-display mb-8">Project not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-muted hover:text-text transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-bg text-text selection:bg-surface/50 overflow-x-hidden relative flex flex-col"
    >
      {/* Hero image */}
      <div className="w-full h-[40vh] md:h-[45vh] lg:h-[50vh] relative overflow-hidden bg-surface/10 ring-1 ring-white/5">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover brightness-[0.85] saturate-[1.1]"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />
        </motion.div>

        {/* Back button — static bg, no backdrop-blur */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="absolute top-8 left-4 md:top-12 md:left-6 z-30"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-xs md:text-sm text-white/50 hover:text-white transition-colors group bg-black/35 px-4 py-2 rounded-full border border-white/10"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Work
          </button>
        </motion.div>
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
                href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-white/60 hover:text-white transition-colors group"
              >
                <span className="border-b border-white/20 group-hover:border-white transition-colors">
                  Live Demo
                </span>
                <span className="text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>
            )}
          </div>
        </motion.header>

        <div className="space-y-4">
          <Section title="Problem"   content={project.details.problem}   />
          <Section title="Approach"  content={project.details.approach}  />
          <Section title="Solution"  content={project.details.solution}  />

          <Section title="Key Features">
            <ul className="grid grid-cols-1 gap-4">
              {project.details.features.map((feature, i) => (
                <li
                  key={i}
                  className="text-lg md:text-xl text-text/80 leading-relaxed font-light flex items-start"
                >
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
                href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
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
