import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const up = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const DetailSection = ({
  label,
  children,
  bg = "bg-bg",
  border = true,
}: {
  label: string;
  children: React.ReactNode;
  bg?: string;
  border?: boolean;
}) => (
  <motion.div
    variants={up}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-5%" }}
    className={`${bg} ${border ? "border-4 border-black shadow-press-md" : ""} p-6 md:p-10`}
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="font-sans font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em] bg-foreground text-bg px-3 py-1.5">
        {label}
      </span>
      <div className="flex-1 h-[3px] bg-black/10" />
    </div>
    {children}
  </motion.div>
);

const ProjectDetail = () => {
  const { slug }   = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const project    = projects.find((p) => p.slug === slug);
  const idx        = projects.findIndex((p) => p.slug === slug);
  const prev       = idx > 0                    ? projects[idx - 1] : null;
  const next       = idx < projects.length - 1  ? projects[idx + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="font-serif italic text-5xl text-bauhaus-red"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          Project not found.
        </h1>
        <Link to="/" className="bg-bauhaus-red text-white px-8 py-4 border-4 border-black shadow-press-sm font-sans font-bold uppercase tracking-widest text-sm">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  const ACCENT_BG   = ["bg-bauhaus-red", "bg-bauhaus-blue", "bg-bauhaus-yellow"] as const;
  const ACCENT_TEXT = ["text-white",     "text-white",      "text-black"]        as const;
  const accentBg    = ACCENT_BG[idx % 3];
  const accentText  = ACCENT_TEXT[idx % 3];

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-bg text-foreground"
    >
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="pt-[68px] bg-bg border-b-4 border-black">
        {/* Accent bar */}
        <div className={`h-2 w-full ${accentBg}`} />

        <div className="max-w-7xl mx-auto px-6 pt-6 md:pt-10 pb-14 md:pb-20">
          <motion.div
            variants={stagger} initial="hidden" animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={up} className="flex items-center gap-2 mb-5">
              <Link to="/" className="eyebrow text-black hover:!text-bauhaus-red transition-colors duration-200">
                ← Portfolio
              </Link>
              <span className="text-muted/40 font-sans text-xs">/</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={up}
              className="font-serif mb-6"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 9vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
              <span className={`inline-block ml-4 align-middle w-4 h-4 border-2 border-black ${accentBg}`} />
            </motion.h1>

            {/* Meta row */}
            <motion.div variants={up} className="flex flex-wrap items-center gap-4 mb-10">
              <p className="font-sans font-bold text-[10px] md:text-[12px] uppercase tracking-[0.25em] text-bauhaus-blue">
                {project.technicalImpact}
              </p>
            </motion.div>

            {/* Image + sidebar */}
            <motion.div variants={up} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image */}
              <div className="lg:col-span-2 border-4 border-black shadow-press-lg overflow-hidden aspect-video bg-muted-bg">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-4">
                {/* Impact callout */}
                <div className={`border-4 border-black p-6 shadow-press-sm ${accentBg} ${accentText}`}>
                  <p className="font-sans font-bold text-[9px] md:text-[11px] uppercase tracking-widest opacity-60 mb-2">What this shows</p>
                  <p className="font-sans font-semibold text-sm md:text-[17px] leading-snug">{project.impact}</p>
                </div>

                {/* Tech stack */}
                <div className="border-4 border-black bg-bg p-6 shadow-press-sm">
                  <p className="font-sans font-bold text-[9px] md:text-[11px] uppercase tracking-widest text-muted mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={t}
                        className={`px-3 py-1.5 border-2 border-black font-sans font-bold text-[10px] md:text-[12px] uppercase tracking-widest
                          ${i % 3 === 0 ? "bg-bauhaus-red text-white" : i % 3 === 1 ? "bg-bauhaus-blue text-white" : "bg-bauhaus-yellow text-black"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.live && (
                    <a
                      href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
                      target="_blank" rel="noopener noreferrer"
                      className={`flex-1 text-center py-3.5 border-4 border-black shadow-press-sm btn-press font-sans font-bold uppercase tracking-widest text-xs md:text-[14.5px] ${accentBg} ${accentText}`}
                    >
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-3.5 bg-foreground text-white border-4 border-black shadow-press-sm btn-press font-sans font-bold uppercase tracking-widest text-xs md:text-[14.5px]"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── Details ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <DetailSection label="Problem"  bg="bg-bg">
              <p className="font-sans font-semibold text-lg md:text-[22px] leading-snug text-foreground/80">
                {project.details.problem}
              </p>
            </DetailSection>

            <DetailSection label="Approach" bg="bg-bg-section">
              <p className="font-sans font-semibold text-lg md:text-[22px] leading-snug text-foreground/80">
                {project.details.approach}
              </p>
            </DetailSection>

            <DetailSection label="Solution" bg="bg-bg">
              <p className="font-sans font-semibold text-lg md:text-[22px] leading-snug text-foreground/80">
                {project.details.solution}
              </p>
            </DetailSection>
          </div>

          {/* Side column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <DetailSection label="Key Features" bg="bg-bauhaus-blue border-4 border-black">
              <ul className="space-y-4">
                {project.details.features.map((f, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 w-2 h-2 bg-white shrink-0" />
                    <p className="font-sans font-semibold text-sm md:text-[17px] text-white leading-snug">{f}</p>
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection label="Impact" bg="bg-bauhaus-yellow border-4 border-black">
              <p className="font-sans font-semibold text-base md:text-[20px] leading-snug text-black">
                {project.details.impact}
              </p>
            </DetailSection>
          </div>
        </div>

        {/* ── Prev / Next ────────────────────────────────── */}
        <div className="mt-20 pt-10 border-t-4 border-black">
          <p className="eyebrow mb-8">More Projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {prev ? (
              <Link
                to={`/project/${prev.slug}`}
                className="group flex items-center gap-5 bg-bg border-4 border-black p-7 shadow-press-md card-lift"
              >
                <span className="font-sans font-black text-2xl group-hover:-translate-x-1 transition-transform duration-200">←</span>
                <div>
                  <p className="font-sans font-bold text-[9px] uppercase tracking-widest text-muted mb-1">Previous</p>
                  <p
                    className="group-hover:text-bauhaus-red transition-colors duration-200"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", lineHeight: 1, letterSpacing: "-0.02em" }}
                  >{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/project/${next.slug}`}
                className="group flex items-center justify-end gap-5 bg-bg border-4 border-black p-7 shadow-press-md card-lift text-right"
              >
                <div>
                  <p className="font-sans font-bold text-[9px] uppercase tracking-widest text-muted mb-1">Next</p>
                  <p
                    className="group-hover:text-bauhaus-blue transition-colors duration-200"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", lineHeight: 1, letterSpacing: "-0.02em" }}
                  >{next.title}</p>
                </div>
                <span className="font-sans font-black text-2xl group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="group flex items-center justify-end gap-5 bg-bauhaus-yellow border-4 border-black p-7 shadow-press-md card-lift text-right"
              >
                <div>
                  <p className="font-sans font-bold text-[9px] uppercase tracking-widest text-black/50 mb-1">You've seen it all</p>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    Back to Portfolio
                  </p>
                </div>
                <span className="font-sans font-black text-2xl group-hover:translate-x-1 transition-transform duration-200">↑</span>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 px-6 border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-sans font-black text-sm uppercase tracking-[-0.02em] hover:text-bauhaus-yellow transition-colors">
            ← Prakyat Shetty
          </Link>
          <div className="flex gap-5 font-sans font-bold text-[11px] uppercase tracking-widest text-white/40">
            <a href="https://github.com/prakyats"     target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/prakyat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;