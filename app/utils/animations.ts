import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation constants
export const ANIMATION_CONFIG = {
  // Durations
  DURATION_FAST: 0.4,
  DURATION_NORMAL: 0.6,
  DURATION_SLOW: 0.8,
  DURATION_COUNTER: 1.0,
  
  // Easing
  EASE_OUT: 'power2.out',
  EASE_IN_OUT: 'power2.inOut',
  EASE_SMOOTH: 'power3.out',
  EASE_NONE: 'none',
  
  // Stagger
  STAGGER_FAST: 0.05,
  STAGGER_NORMAL: 0.1,
  STAGGER_SLOW: 0.15,
  
  // Distances
  TRANSLATE_SMALL: 20,
  TRANSLATE_MEDIUM: 40,
  TRANSLATE_LARGE: 60,
} as const;

// Utility to check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility to check for mobile device
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
};

// Common animation functions
export const fadeInUp = (
  element: string | Element,
  options: {
    duration?: number;
    delay?: number;
    distance?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_NORMAL,
    delay = 0,
    distance = ANIMATION_CONFIG.TRANSLATE_MEDIUM,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: distance,
    },
    {
      opacity: 1,
      y: 0,
      duration: isMobile() ? duration * 0.8 : duration,
      delay,
      ease: ANIMATION_CONFIG.EASE_OUT,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const fadeIn = (
  element: string | Element,
  options: {
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_NORMAL,
    delay = 0,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: isMobile() ? duration * 0.8 : duration,
      delay,
      ease: ANIMATION_CONFIG.EASE_OUT,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const staggerFadeInUp = (
  elements: string | NodeList | Element[],
  options: {
    duration?: number;
    stagger?: number;
    distance?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_NORMAL,
    stagger = ANIMATION_CONFIG.STAGGER_NORMAL,
    distance = ANIMATION_CONFIG.TRANSLATE_MEDIUM,
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: distance,
    },
    {
      opacity: 1,
      y: 0,
      duration: isMobile() ? duration * 0.8 : duration,
      stagger: isMobile() ? stagger * 0.8 : stagger,
      ease: ANIMATION_CONFIG.EASE_OUT,
      scrollTrigger: {
        trigger: trigger || elements as unknown as Element,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const scaleIn = (
  element: string | Element,
  options: {
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_NORMAL,
    delay = 0,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, scale: 1 });
    return;
  }

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: isMobile() ? duration * 0.8 : duration,
      delay,
      ease: ANIMATION_CONFIG.EASE_OUT,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const slideInFromLeft = (
  element: string | Element,
  options: {
    duration?: number;
    delay?: number;
    distance?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_NORMAL,
    delay = 0,
    distance = ANIMATION_CONFIG.TRANSLATE_LARGE,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -distance,
    },
    {
      opacity: 1,
      x: 0,
      duration: isMobile() ? duration * 0.8 : duration,
      delay,
      ease: ANIMATION_CONFIG.EASE_OUT,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const growWidth = (
  element: string | Element,
  options: {
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    duration = ANIMATION_CONFIG.DURATION_FAST,
    delay = 0,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { scaleX: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: isMobile() ? duration * 0.8 : duration,
      delay,
      ease: ANIMATION_CONFIG.EASE_OUT,
      transformOrigin: 'center center',
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const parallaxY = (
  element: string | Element,
  options: {
    yPercent?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    yPercent = -50,
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  if (prefersReducedMotion() || isMobile()) {
    return;
  }

  gsap.to(element, {
    yPercent,
    ease: ANIMATION_CONFIG.EASE_NONE,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
};

export const counterAnimation = (
  element: string | Element,
  options: {
    from?: number;
    to: number;
    duration?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
  }
) => {
  const {
    from = 0,
    to,
    duration = ANIMATION_CONFIG.DURATION_COUNTER,
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  if (prefersReducedMotion()) {
    if (element instanceof Element) {
      element.textContent = to.toString();
    } else {
      const el = document.querySelector(element);
      if (el) el.textContent = to.toString();
    }
    return;
  }

  const obj = { value: from };
  
  gsap.to(obj, {
    value: to,
    duration: isMobile() ? duration * 0.8 : duration,
    ease: ANIMATION_CONFIG.EASE_OUT,
    onUpdate: () => {
      const currentValue = Math.round(obj.value);
      if (element instanceof Element) {
        element.textContent = currentValue.toString();
      } else {
        const el = document.querySelector(element);
        if (el) el.textContent = currentValue.toString();
      }
    },
    scrollTrigger: {
      trigger,
      start,
      end,
      toggleActions: 'play none none none',
    },
  });
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger (useful for dynamic content)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};