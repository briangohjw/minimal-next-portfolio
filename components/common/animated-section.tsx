"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  id?: string;
  /**
   * Play the entrance on mount instead of when scrolled into view. Use for
   * listing pages where off-screen items shouldn't stay hidden until scrolled.
   */
  animateOnMount?: boolean;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  animateOnMount = false,
}: AnimatedSectionProps) => {
  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const initialOffset = directionOffset[direction];

  const target = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut" as const,
    },
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      {...(animateOnMount
        ? { animate: target }
        : {
            whileInView: target,
            viewport: { once: true, margin: "-100px" },
          })}
    >
      {children}
    </motion.div>
  );
};
