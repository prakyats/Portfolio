import { motion } from "framer-motion";
import Hero    from "../components/Hero";
import About   from "../components/About";
import Projects from "../components/Projects";
import Contact  from "../components/Contact";
import Navbar   from "../components/Navbar";

const Home = () => (
  <main className="relative min-h-screen bg-bg text-foreground overflow-x-hidden">
    <Navbar />

    {/* Background geometry — very subtle, doesn't compete */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.045 }}
        transition={{ duration: 2 }}
        className="absolute -top-[15%] -right-[8%] w-[50vw] h-[50vw] rounded-full bg-bauhaus-blue"
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.03 }}
        transition={{ duration: 2.5 }}
        className="absolute top-[45%] -left-[15%] w-[40vw] h-[40vw] bg-bauhaus-red"
      />
    </div>

    <div className="relative z-10">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>

    <footer className="relative z-10 bg-foreground text-white py-8 px-6 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-bauhaus-red border-[1.5px] border-white rounded-full" />
            <div className="w-3 h-3 bg-bauhaus-blue border-[1.5px] border-white" />
            <div className="w-3 h-3 bg-bauhaus-yellow border-[1.5px] border-white bauhaus-triangle" />
          </div>
          <span className="font-sans font-black text-sm uppercase tracking-[-0.02em]">Prakyat Shetty</span>
        </div>
        <p className="font-sans text-[11px] text-white/40 uppercase tracking-widest">
          Built with React · TypeScript · Framer Motion · 2026
        </p>
        <div className="flex gap-5 font-sans font-bold text-[11px] uppercase tracking-widest text-white/40">
          <a href="https://github.com/prakyats"       target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/prakyat"   target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:shettyprakyat15@gmail.com"                                             className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  </main>
);

export default Home;