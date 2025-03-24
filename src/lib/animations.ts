import { Variants } from "framer-motion";

/**
 * Fade-in animation with slight vertical movement
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Fade-in animation with customizable delay
 */
export const fadeInWithDelay = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  },
});

/**
 * Scale and fade entrance for modals and popups
 */
export const popIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.19, 1.0, 0.22, 1.0], // Custom easing for a smooth pop effect
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/**
 * Simple opacity transition without movement
 */
export const fadeInPlace: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Sequenced animations for lists of items
 */
export const staggerChildren: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
};

/**
 * Animation for feature highlight transitions
 */
export const featureTransition: Variants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Subtle floating animation for background elements
 */
export const floatingAnimation = (
  yOffset: number = 15,
  duration: number = 6
): Variants => ({
  animate: {
    y: [`-${yOffset}px`, `${yOffset}px`, `-${yOffset}px`],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
