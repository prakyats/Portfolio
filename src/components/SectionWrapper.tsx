/**
 * SectionWrapper — Performance-optimised scroll system
 *
 * Changes from previous version:
 *
 *  1. isMobile: removed useState + useEffect + addEventListener.
 *     Replaced with a single matchMedia().matches at module level.
 *     → Zero React re-renders, zero event listeners, zero teardown.
 *
 *  2. Removed window.dispatchEvent(new Event("scroll")) on resize.
 *     This was firing all scroll handlers artificially on every resize.
 *
 *  3. Removed the double addEventListener("resize") (two handlers were
 *     registered, one for setIsMobile and one for dispatchEvent).
 *
 *  4. Removed the direction dead-zone logic entirely:
 *     - useMotionValueEvent(scrollY, "change", ...) was running a JS callback
 *       every scroll tick just to set a direction MotionValue.
 *     - That directionMV then fed into a chained useTransform([stableProgress,
 *       directionMV], ([p, dir]) => { ... }) which ran MORE custom JS per frame.
 *     - The visual effect (15% Y reduction on reverse scroll) was imperceptible.
 *     - Cost: 2 JS function calls per scroll frame. Removed entirely.
 *
 *  5. Removed the stableProgress intermediate useTransform with a custom
 *     clamping function. That was a derived MotionValue running JS per frame.
 *     The same clamping is now implicit in the input keyframes array.
 *
 *  6. Result: scrollYProgress → y and scrollYProgress → opacity.
 *     Two direct useTransform calls. Pure interpolation. No JS per frame.
 *
 *  7. Added section-contained CSS class (contain: layout paint) to prevent
 *     off-screen sections from affecting layout recalc of on-screen ones.
 *
 *  8. Removed useMemo import (was imported but never used anywhere).
 */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Read once at module initialisation — no listener, no state, no re-renders.
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Single-hop transforms — direct interpolation, zero custom JS per frame.
  const y = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7, 1],
    isMobile ? [28, 0, 0, -14] : [50, 0, 0, -20]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.08, 0.25, 0.75, 0.95],
    [0, 1, 1, 0.85]
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative section-contained ${className}`}
    >
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none transform-gpu"
      >
        <div className="pointer-events-auto">{children}</div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper;
