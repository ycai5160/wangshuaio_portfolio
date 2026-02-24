'use client';

import React, { useRef, useState, useEffect } from 'react';
import CustomCursor, { CustomCursorRef } from './CustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp, fadeIn, growWidth, staggerFadeInUp, counterAnimation } from '../utils/animations';

const projects = [
  {
    id: 1,
    title: "钛7上市全案",
    category: "项目经理 · 监制 / 2025",
    description: [
      "钛7上市全案视频前期筹备及拍摄，含套剪合计交付16支。",
      "项目需求80余个功能点，PPM资料400余页，于25天内完成筹备、期间拍摄并交付16条视频。",
      "其中包括1条tvc、两条格调视频、12条pv视频、一条潮改视频。"
    ],
    image: "/taiseven.png",
  },
  {
    id: 2,
    title: "腾势N8L上市全案项目",
    category: "监制 · 制片/ 2025",
    image: "/tengshiN8L.jpg",
  },
  {
    id: 3,
    title: "腾势N8L上市测试项目",
    category: "项目经理 · 监制/ 2025",
    description:
     [ "于9月22日接到需求，9月26日提交四条测试视频。",
      "四天超极限完成四条视频的筹备、拍摄、后期，并如期交付。"],
    image: "/tengshitest.jpg",
    embedUrl: "https://player.xinpianchang.com/?aid=13496200&mid=2MmN455MjRR4X0zL",
  },
  {
    id: 4,
    title: "仰望·U9圣诞格调视频",
    category: "监制 / 2025",
    image: "/yangwangU9.jpg",
    embedUrl: "https://f.video.weibocdn.com/o0/dRn111XElx08u1fBET6M010412006JSQ0E010.mp4?label=mp4_hd&template=852x480.25.0&ori=0&ps=1BThihd3VLAY5R&Expires=1771915604&ssig=QvBp5o%2BrQa&KID=unistore,video",
  },
  {
    id: 5,
    title: "王朝·汉L秋季加推格调视频",
    category: "监制 / 2025",
    image: "HanL.png",
  },
  {
    id: 6,
    title: "DENZA·B8海外格调视频",
    category: "监制 / 2025",
    image: "denza.png",
    embedUrl: "https://player.xinpianchang.com/?aid=13523777&mid=DA96Qey2j56Qj5N0",
  },
  {
    id: 7,
    title: "日本kcar展示视频",
    category: "监制 / 2025",
    image: "jpkcar.jpg",
  },
];

interface BaseProject {
  id: number;
  title: string;
  category: string;
  image: string;
  embedUrl?: string;
}

interface ProjectWithDescription extends BaseProject {
  description: string[];
}

interface ProjectWithStats extends BaseProject {
  stats: Array<{
    number: string;
    unit: string;
    label: string;
  }>;
}

interface ProjectWithStringDescription extends BaseProject {
  description: string;
}

type Project = ProjectWithDescription | ProjectWithStats | ProjectWithStringDescription | BaseProject;

const VideoLightbox = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const embedUrl = 'embedUrl' in project ? project.embedUrl : undefined;

  const handleVideoError = () => {
    console.error('Video failed to load:', embedUrl);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully:', embedUrl);
    setVideoLoaded(true);
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 z-10 text-neutral-400 hover:text-neutral-50 transition-colors text-sm tracking-widest uppercase"
      >
        关闭 ✕
      </button>

      {/* Video container */}
      <div
        className="relative z-10 w-full max-w-5xl px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[16/9] bg-neutral-900 relative">
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-neutral-400 text-sm">加载中...</div>
            </div>
          )}
          
          {videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="text-neutral-400 text-lg mb-2">视频加载失败</div>
              <div className="text-neutral-500 text-sm mb-4">该视频可能不支持嵌入播放</div>
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-neutral-50 text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                在原平台观看
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 6L9 8L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ) : (
            <iframe
              src={`${embedUrl}&autoplay=1&muted=1`}
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen"
              frameBorder="0"
              className="w-full h-full"
              style={{ border: 'none' }}
              onError={handleVideoError}
              onLoad={handleVideoLoad}
            />
          )}
        </div>
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-neutral-50">{project.title}</h3>
            <p className="text-neutral-500 text-sm tracking-wider uppercase mt-1">{project.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const cursorRef = useRef<CustomCursorRef>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Section header animations
    if (titleRef.current && sectionRef.current) {
      fadeInUp(titleRef.current, {
        duration: 0.6,
        distance: 30,
        trigger: sectionRef.current,
        start: 'top 70%',
      });
    }

    if (dividerRef.current && sectionRef.current) {
      growWidth(dividerRef.current, {
        duration: 0.4,
        delay: 0.2,
        trigger: sectionRef.current,
        start: 'top 70%',
      });
    }

    if (subtitleRef.current && sectionRef.current) {
      fadeIn(subtitleRef.current, {
        duration: 0.4,
        delay: 0.4,
        trigger: sectionRef.current,
        start: 'top 70%',
      });
    }

    // Project cards staggered reveal
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      staggerFadeInUp(projectCards, {
        duration: 0.5,
        stagger: 0.1,
        distance: 40,
        trigger: projectsRef.current,
        start: 'top 80%',
      });
    }

    // Stats counter animations for project 1
    const statsNumbers = document.querySelectorAll('.stats-number');
    statsNumbers.forEach((numberEl, index) => {
      const targetValue = parseInt(numberEl.textContent || '0');
      if (targetValue > 0) {
        counterAnimation(numberEl, {
          from: 0,
          to: targetValue,
          duration: 1.0,
          trigger: numberEl.closest('.stats-container') as unknown as Element,
          start: 'top 80%',
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) cursorRef.current?.show();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile && cursorRef.current) {
      cursorRef.current.updatePosition(e.clientX, e.clientY);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) cursorRef.current?.hide();
  };

  const handleProjectClick = (project: Project) => {
    if ('embedUrl' in project && project.embedUrl) {
      setLightboxProject(project);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="works"
        className="py-16 md:py-24 px-4 md:px-12 bg-neutral-950"
      >
        <CustomCursor ref={cursorRef} />
        <div className="max-w-[1440px] mx-auto">
          {/* Section Heading */}
          <div className="mb-10 md:mb-24 flex flex-col items-center justify-between gap-2">
            <h2 
              ref={titleRef}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-50 tracking-tight animate-element"
              style={{ opacity: 0 }}
            >
              主要项目
            </h2>
            <div 
              ref={dividerRef}
              className="m-3 md:m-4 w-16 md:w-20 h-[4px] md:h-[5px] bg-primary-500 animate-element"
              style={{ transform: 'scaleX(0)' }}
            ></div>
            <p 
              ref={subtitleRef}
              className="text-xs md:text-base text-neutral-300 font-extralight tracking-wider uppercase text-center animate-element"
              style={{ opacity: 0 }}
            >
              主导比亚迪多品牌需求对接，逾30项视频项目交付
            </p>
          </div>

          <div 
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-24"
          >
            {projects.map((project, index) => (
              <div
                key={project.image}
                className={`group project-card animate-element ${index < 3 ? 'md:col-span-2' : ''}`}
                style={{ opacity: 0 }}
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-[16/9] overflow-hidden bg-neutral-900 mb-5 md:mb-8"
                  onMouseEnter={'embedUrl' in project && project.embedUrl ? handleMouseEnter : undefined}
                  onMouseLeave={'embedUrl' in project && project.embedUrl ? handleMouseLeave : undefined}
                  onMouseMove={'embedUrl' in project && project.embedUrl ? handleMouseMove : undefined}
                  onClick={() => handleProjectClick(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Mobile-only static play button overlay */}
                  {'embedUrl' in project && project.embedUrl && (
                    <div className="md:hidden absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-primary-500/90 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '3px' }}>
                          <polygon points="6,3 26,14 6,25" fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Title + description row — stacked on mobile, row on desktop */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <h3 className={`font-medium text-neutral-50 ${index < 3 ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-xs md:text-sm tracking-wider uppercase">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Description section */}
                  {'description' in project && Array.isArray(project.description) && (
                    <div className="pt-4 border-t border-neutral-800">
                      <ul className="space-y-2">
                        {(project as ProjectWithDescription).description.map((item, i) => (
                          <li key={i} className="text-neutral-300 text-sm md:text-base leading-relaxed flex items-start gap-3">
                            <span className="text-primary-500 mt-2 text-xs">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxProject && (
        <VideoLightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}
    </>
  );
};

export default Works;
