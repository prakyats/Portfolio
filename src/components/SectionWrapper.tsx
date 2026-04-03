/**
 * Spatial Motion System — FINALIZED
 * Do not modify transforms or animation logic.
 * This system is calibrated for stability, performance, and cross-device consistency.
 */
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, transform } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "", id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Safe Mobile Detection (Prevents hydration mismatch)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // 2. Resize Re-calibration (Forces layout update on orientation change)
    const handleResize = () => {
      window.dispatchEvent(new Event("scroll"));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3. Direction Dead-Zone Logic
  const directionMV = useMotionValue(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    const diff = latest - prev;
    if (Math.abs(diff) < 2) return; // Dead-zone filter
    directionMV.set(diff > 0 ? 1 : -1);
  });

  // 4. Clamping & Stable Progress (Edge Freezing)
  const stableProgress = useTransform(scrollYProgress, (v) => {
    const clamped = Math.min(Math.max(v, 0), 1);
    if (clamped < 0.05) return 0;
    if (clamped > 0.95) return 1;
    return clamped;
  });

  // 5. Unified Single Transform Pipeline
  const finalY = useTransform(
    [stableProgress, directionMV],
    ([p, dir]) => {
      const base = isMobile
        ? transform(p as number, [0.2, 0.5, 0.8], [30, 0, -15])
        : transform(p as number, [0.2, 0.5, 0.8], [50, 0, -20]);
      
      const adjusted = (dir as number) === -1 ? base * 0.85 : base;
      return Math.min(Math.max(adjusted, -25), 60);
    }
  );

  const opacity = useTransform(stableProgress, [0.2, 0.5, 0.8], [0.8, 1, 0.9]);

  return (
    <div id={id} ref={containerRef} className={`relative ${className}`}>
      <motion.div
        style={{ 
          y: finalY, 
          opacity,
          transformOrigin: "center center"
        }}
        initial={false}
        className="pointer-events-none transform-gpu will-change-transform"
      >
        <div className="pointer-events-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper;
