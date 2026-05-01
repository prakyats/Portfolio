import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Contact = () => {
  return (
    <SectionWrapper id="contact" className="bg-[#111111] py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Background decoration — no expensive blur, simple opacity shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-red opacity-[0.07] pointer-events-none" aria-hidden />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-bauhaus-red">Contact</span>
            <h2 className="text-display-large mb-10">
              LET'S<br />
              <span className="italic text-bauhaus-yellow">CONNECT.</span>
            </h2>

            <p className="font-display font-bold text-lg uppercase tracking-tight text-white/70 mb-10 leading-snug max-w-sm">
              Open to internships, collaborations, and projects worth building.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:shettyprakyat15@gmail.com"
                className="flex items-center gap-4 group w-fit"
              >
                <div className="w-11 h-11 bg-bauhaus-blue flex items-center justify-center border-2 border-white shadow-hard-sm group-hover:shadow-hard-md transition-shadow duration-200">
                  <span className="font-display font-black text-white text-sm">@</span>
                </div>
                <span className="font-display font-bold text-lg hover:text-bauhaus-yellow transition-colors duration-200 tracking-tight uppercase break-all">
                  shettyprakyat15@gmail.com
                </span>
              </a>
              <a
                href="https://linkedin.com/in/prakyatshetty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-fit"
              >
                <div className="w-11 h-11 bg-bauhaus-red flex items-center justify-center border-2 border-white shadow-hard-sm group-hover:shadow-hard-md transition-shadow duration-200">
                  <span className="font-display font-black text-white text-sm">in</span>
                </div>
                <span className="font-display font-bold text-lg hover:text-bauhaus-yellow transition-colors duration-200 tracking-tight uppercase">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://github.com/prakyats"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-fit"
              >
                <div className="w-11 h-11 bg-white flex items-center justify-center border-2 border-white shadow-hard-sm group-hover:shadow-hard-md transition-shadow duration-200">
                  <span className="font-display font-black text-black text-sm">gh</span>
                </div>
                <span className="font-display font-bold text-lg hover:text-bauhaus-yellow transition-colors duration-200 tracking-tight uppercase">
                  GitHub
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-white p-8 md:p-10 border-4 border-black shadow-hard-lg text-black"
          >
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-8 border-b-4 border-black pb-6">
              Send a Message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name  = (form.elements.namedItem("name")    as HTMLInputElement).value;
                const email = (form.elements.namedItem("email")   as HTMLInputElement).value;
                const msg   = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                window.location.href = `mailto:shettyprakyat15@gmail.com?subject=Hello from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AReply to: ${encodeURIComponent(email)}`;
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block font-display font-black uppercase text-xs tracking-widest mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full bg-[#F5F5F5] border-4 border-black p-4 font-display font-bold focus:outline-none focus:bg-bauhaus-yellow transition-colors duration-150 placeholder:opacity-30"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-display font-black uppercase text-xs tracking-widest mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full bg-[#F5F5F5] border-4 border-black p-4 font-display font-bold focus:outline-none focus:bg-bauhaus-blue focus:text-white transition-colors duration-150 placeholder:opacity-30"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-display font-black uppercase text-xs tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#F5F5F5] border-4 border-black p-4 font-display font-bold focus:outline-none focus:bg-bauhaus-red focus:text-white transition-colors duration-150 placeholder:opacity-30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 border-4 border-black shadow-hard-sm hover:shadow-hard-md bauhaus-button-press font-display font-black uppercase tracking-widest"
              >
                Send Message →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
