'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Enhanced scroll background animation
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(12px)',
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'body',
          start: '50px top',
          end: '51px top',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Active section tracking
    const sections = ['hero', 'works', 'other-projects', 'footer'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
        });
      }
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      style={{ backdropFilter: 'none' }}
    >
      <div className="max-w-full mx-auto px-6 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className={`text-base md:text-md font-medium tracking-tight uppercase transition-colors duration-300 ${
              isScrolled ? 'text-neutral-50' : 'text-neutral-700'
            }`}
          >
            Wangshuaio Portfolio
          </button>

          <div className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => scrollToSection('works')}
              className={`text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-neutral-300 hover:text-primary-400' : 'text-neutral-700 hover:text-primary-600'
              } ${activeSection === 'works' ? (isScrolled ? 'text-primary-400' : 'text-primary-600') : ''}`}
            >
              项目
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className={`text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-neutral-300 hover:text-primary-400' : 'text-neutral-700 hover:text-primary-600'
              } ${activeSection === 'footer' ? (isScrolled ? 'text-primary-400' : 'text-primary-600') : ''}`}
            >
              联系
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
