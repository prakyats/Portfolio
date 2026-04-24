import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row border-b-4 border-black overflow-hidden bg-white pt-[72px]">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-start px-6 md:px-12 pt-8 md:pt-8 pb-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Label row */}
          <div className="flex items-center gap-3 mb-6">
            <span className="section-label !mb-0">Full Stack Developer</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-bauhaus-red rounded-full" />
              <div className="w-2.5 h-2.5 bg-bauhaus-blue" />
              <div className="w-2.5 h-2.5 bg-bauhaus-yellow bauhaus-triangle" />
            </div>
          </div>

          <h1 className="text-display-massive mb-6">
            PRAKYAT<br />
            SHETTY
          </h1>

          <p className="font-display font-bold text-xl md:text-3xl uppercase tracking-tighter leading-[1.1] mb-3 max-w-2xl">
            I BUILD SYSTEMS{" "}
            <span className="italic text-bauhaus-blue">THAT ACTUALLY WORK</span>,
            NOT JUST INTERFACES.
          </p>

          {/* One-line context — tells visitors exactly who this is */}
          <p className="font-display text-base md:text-lg text-black/50 uppercase tracking-widest mb-12">
            CS Student · DSCE Bangalore · Available for Internships
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="bg-bauhaus-red text-white px-10 py-4 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase tracking-widest text-sm"
            >
              View Work ↓
            </a>
            <a
              href="https://drive.google.com/file/d/1sVaHTtBRtKNGmlivaACbb4m0CN54uQSe/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-4 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase tracking-widest text-sm"
            >
              Resume ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Panel — blue block with geometric composition */}
      <div className="lg:w-[38%] bg-bauhaus-blue border-l-4 border-black relative overflow-hidden flex items-center justify-center min-h-[360px] lg:min-h-screen">
        <div className="absolute inset-0 dot-pattern opacity-15" />

        {/* Geometric composition — static after entry, no continuous rotation */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Outer border ring — spins once on entry only */}
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 0.35, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 border-4 border-white"
          />
          {/* Red square — now revolves continuously */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              scale:  { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-0 left-0 w-32 h-32 bg-bauhaus-red border-4 border-black shadow-hard-sm"
          />
          {/* Yellow circle */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-bauhaus-yellow border-4 border-black shadow-hard-sm"
          />
          {/* White centre square — now revolves while text stays still */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 340 }}
            transition={{
              scale:  { delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white border-4 border-black shadow-hard-sm flex items-center justify-center"
          >
            <motion.span
              initial={{ rotate: 20 }}
              animate={{ rotate: -340 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="font-display font-black text-4xl text-black block leading-none"
            >
              PS
            </motion.span>
          </motion.div>
        </div>

        {/* Vertical info text — hidden on mobile to avoid overflow issues */}
        <div className="absolute right-4 bottom-12 rotate-90 origin-right hidden lg:block">
          <p className="font-display font-black text-white text-6xl opacity-15 uppercase tracking-[0.15em] whitespace-nowrap">
            FULL STACK · BANGALORE · 2027
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
