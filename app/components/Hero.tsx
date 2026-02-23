'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallaxY, fadeInUp, fadeIn, scaleIn } from '../utils/animations';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Parallax for watermark text
    if (watermarkRef.current && heroRef.current) {
      parallaxY(watermarkRef.current, {
        yPercent: -30,
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
      });
    }

    // Page load animations with staggered timing
    const tl = gsap.timeline({ delay: 0.1 });
    
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    if (roleRef.current) {
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative flex items-center min-h-screen px-6 md:px-12 overflow-hidden bg-primary-50 pt-24 md:pt-0 pb-12 md:pb-0"
    >
      {/* Background Watermark Text with Parallax */}
      <div 
        ref={watermarkRef}
        className="absolute select-none pointer-events-none parallax-element"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 className="text-[25vw] md:text-[25vw] text-primary-100/50 leading-none tracking-wide" style={{ fontFamily: 'var(--font-great-vibes)' }}>
        Portfolio
        </h2>
      </div>

      {/* Gradient overlay: primary-50 at top fading to transparent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--primary-50) 0%, transparent 80%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
        <div className="space-y-8 md:space-y-12 flex-1 w-full md:w-auto">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-wide text-neutral-900 leading-tight md:leading-none animate-element"
              style={{ opacity: 0 }}
            >
              王帅鸥
            </h1>

          
          <div className="space-y-5 md:space-y-7 max-w-lg pt-2">
            {/* Role - Refined Secondary Typography */}
            <p 
              ref={roleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-[0.08em] text-neutral-900/90 leading-relaxed animate-element"
              style={{ opacity: 0 }}
            >
              监制 <span className="text-neutral-900/30 mx-3 font-normal">/</span> 制片
            </p>
            
            {/* Description - Tertiary Typography */}
            <p 
              ref={descriptionRef}
              className="text-sm sm:text-base md:text-lg text-neutral-600 font-light leading-loose tracking-wide animate-element"
              style={{ opacity: 0 }}
            >
              现就职于比亚迪汽车，负责品牌宣传片、功能视频、创意短片等创意内容。拥有影视全流程的专业制作经验，并可适应AIGC工作流。
            </p>

            {/* CTA Button */}
            <div 
              ref={ctaRef}
              className="pt-2 animate-element"
              style={{ opacity: 0 }}
            >
              <a
                href="/王帅鸥简历.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary-500 text-neutral-50 text-sm font-medium tracking-wider hover:bg-neutral-900 transition-colors duration-300"
              >
                查看简历
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div 
          ref={imageRef}
          className="relative w-full max-w-[400px] md:w-[500px] aspect-[3/4] overflow-hidden flex-shrink-0 animate-element"
          style={{ opacity: 0 }}
        >
          <Image
            src="/image_01.png"
            alt="Portfolio Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 border border-neutral-900/5"></div>
        </div>
      </div>
      
      
    </section>
  );
};

export default Hero;
