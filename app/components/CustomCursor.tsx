'use client';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

export interface CustomCursorRef {
  show: () => void;
  hide: () => void;
  updatePosition: (x: number, y: number) => void;
}

const CustomCursor = forwardRef<CustomCursorRef>((props, ref) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (cursorRef.current) {
      // Initialize GSAP quickTo for ultra-smooth position updates
      xTo.current = gsap.quickTo(cursorRef.current, 'x', {
        duration: 0.6,
        ease: 'power3.out',
      });
      yTo.current = gsap.quickTo(cursorRef.current, 'y', {
        duration: 0.6,
        ease: 'power3.out',
      });

      // Set initial state
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    },
    hide: () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
        });
      }
    },
    updatePosition: (x: number, y: number) => {
      if (xTo.current && yTo.current) {
        xTo.current(x);
        yTo.current(y);
      }
    },
  }));

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        pointerEvents: 'none',
        opacity: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        top: 0,
        left: 0,
      }}
    >
      {/* SVG Play button */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: '4px' }}
      >
        <polygon
          points="6,3 26,14 6,25"
          fill="var(--primary-50)"
          stroke="var(--primary-50)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
