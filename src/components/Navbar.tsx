/**
 * Navbar — sticky navigation with:
 *  - Active section highlighting via IntersectionObserver (zero scroll listeners)
 *  - Smooth scroll to section anchors
 *  - Mobile hamburger menu
 *  - Visible on scroll down, hides on fast scroll up to save space
 */
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "About",    href: "#about"   },
  { label: "Work",     href: "#work"    },
  { label: "Contact",  href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Observe sections; the topmost visible one is "active"
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ href }) =>
      document.querySelector(href) as HTMLElement
    ).filter(Boolean);

    const visibleMap = new Map<string, boolean>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.isIntersecting);
        });
        const active = NAV_ITEMS.find(({ href }) =>
          visibleMap.get(href.slice(1))
        );
        if (active) setActiveSection(active.href);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((s) => observerRef.current!.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Show border only after scrolling past hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle scrolling to hash if present in URL
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-bg transition-shadow duration-200 ${
        scrolled ? "border-b-4 border-black shadow-hard-sm" : ""
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== "/") {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 bg-bauhaus-red border-2 border-black group-hover:rotate-12 transition-transform duration-200" />
            <div className="w-4 h-4 bg-bauhaus-blue border-2 border-black rounded-full group-hover:scale-110 transition-transform duration-200" />
            <div className="w-4 h-4 bg-bauhaus-yellow border-2 border-black bauhaus-triangle group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className="font-display font-black uppercase tracking-tighter text-xl">P.S.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`nav-link ${activeSection === href ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1sVaHTtBRtKNGmlivaACbb4m0CN54uQSe/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bauhaus-red text-white px-5 py-2.5 border-2 border-black shadow-hard-sm bauhaus-button-press font-display font-black uppercase text-xs tracking-widest"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[3px] bg-black transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block w-6 h-[3px] bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[3px] bg-black transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-200 border-t-4 border-black px-6 py-8 flex flex-col gap-3">
          {NAV_ITEMS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="font-display font-black uppercase text-1xl tracking-tighter text-left hover:text-bauhaus-red transition-colors"
            >
              {label}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1sVaHTtBRtKNGmlivaACbb4m0CN54uQSe/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bauhaus-red text-white px-5 py-3 border-2 border-black shadow-hard-sm font-display font-black uppercase tracking-widest text-sm text-center"
          >
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
