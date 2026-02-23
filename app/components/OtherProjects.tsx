'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CustomCursor, { CustomCursorRef } from './CustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp, fadeIn, staggerFadeInUp } from '../utils/animations';

const otherProjects = [
  {
    id: 0,
    title: "ELLE风尚大典x群星",
    type: "商业广告",
    role: "创意、执行导演",
    image: "/project0.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12790938&amp;mid=1xNm498ZdOywEBVK",
  },
  {
    id: 1,
    title: "Cartier | Clash de Cartier",
    type: "商业广告",
    role: "执行导演",
    image: "/project2.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12798817&amp;mid=Xl5M7nV930a7kKEg",
  },
  {
    id: 2,
    title: "中国消防119蓝朋友本色",
    type: "公益宣传片",
    role: "创意、执行导演",
    image: "/project1.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12791989&amp;mid=36Jm4a8RAGpwyjzB",
  },
  {
    id: 3,
    title: "Stormshot",
    type: "SLG+解谜射击游戏",
    role: "策划",
    image: "/project3.png",
  },
  {
    id: 4,
    title: "Dateback",
    type: "VR 游戏",
    role: "制作人",
    image: "/project7.png",
  },
  {
    id: 5,
    title: "日日晴",
    type: "剧情短片",
    role: "制片",
    image: "/project5.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12045067&amp;mid=z3Yn57pezRAwdDAa",
  },
  {
    id: 6,
    title: "夏日大作战",
    type: "剧情短片",
    role: "制片",
    image: "/project6.png",
    embedUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=210855970&bvid=BV1wa411m7CV&cid=490337458&p=1",
  },
  {
    id: 7,
    title: "赵馨兰在北京",
    type: "纪录片",
    role: "导演",
    image: "/zhaoxinlan.jpg",
    embedUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=246461759&bvid=BV1Gv411e7vZ&cid=289144491&p=1",
  },
  {
    id: 8,  
    title: "活动运营",
    type: "内容运营",
    image: "/project4.png",
  },
  {
    id: 9,
    title: "Dark halloween",
    type: "VR 游戏",
    role: "制作人",
    image: "/project8.png",
  },
  {
    id: 10,
    title: "箱子",
    type: "VR短片",
    role: "制作人",
    image: "/project9.png",
  },
];

type OtherProject = typeof otherProjects[number] & { embedUrl?: string };

const VideoLightbox = ({ project, onClose }: { project: OtherProject; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm" />
      <button
        onClick={onClose}
        className="absolute top-6 right-8 z-10 text-neutral-400 hover:text-neutral-50 transition-colors text-sm tracking-widest uppercase"
      >
        关闭 ✕
      </button>
      <div className="relative z-10 w-full max-w-5xl px-6" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-[16/9] bg-neutral-900">
          <iframe
            src={`${project.embedUrl}&autoplay=1`}
            allowFullScreen
            allow="autoplay; fullscreen"
            frameBorder="0"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-neutral-50">{project.title}</h3>
          <p className="text-neutral-500 text-sm tracking-wider uppercase mt-1">{project.type}</p>
        </div>
      </div>
    </div>
  );
};

const OtherProjects = () => {
  const cursorRef = useRef<CustomCursorRef>(null);
  const [lightboxProject, setLightboxProject] = useState<OtherProject | null>(null);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => cursorRef.current?.show();
  const handleMouseLeave = () => cursorRef.current?.hide();
  const handleMouseMove = (e: React.MouseEvent) => {
    cursorRef.current?.updatePosition(e.clientX, e.clientY);
  };

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

    if (subtitleRef.current && sectionRef.current) {
      fadeIn(subtitleRef.current, {
        duration: 0.4,
        delay: 0.2,
        trigger: sectionRef.current,
        start: 'top 70%',
      });
    }

    // Masonry grid items staggered reveal
    if (gridRef.current) {
      const projectItems = gridRef.current.querySelectorAll('.project-item');
      staggerFadeInUp(projectItems, {
        duration: 0.5,
        stagger: 0.08,
        distance: 30,
        trigger: gridRef.current,
        start: 'top 85%',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="py-20 md:py-32 px-6 md:px-24 bg-primary-50"
      >
        <CustomCursor ref={cursorRef} />
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-20">
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-3 animate-element"
              style={{ opacity: 0 }}
            >
              其他项目
            </h2>
            <p 
              ref={subtitleRef}
              className="text-sm md:text-base text-neutral-600 tracking-wider uppercase animate-element"
              style={{ opacity: 0 }}
            >
              Other Projects
            </p>
          </div>

          {/* Masonry Grid - 3 Columns */}
          <div 
            ref={gridRef}
            className="columns-2 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8"
          >
            {(otherProjects as OtherProject[]).map((project) => {
              const hasVideo = !!project.embedUrl;
              return (
                <div 
                  key={project.id} 
                  className="break-inside-avoid project-item animate-element"
                  style={{ opacity: 0 }}
                >
                  {/* Image Container */}
                  <div
                    className={`relative bg-neutral-100 overflow-hidden mb-4 ${hasVideo ? 'cursor-pointer' : 'cursor-default'}`}
                    onMouseEnter={hasVideo ? handleMouseEnter : undefined}
                    onMouseLeave={hasVideo ? handleMouseLeave : undefined}
                    onMouseMove={hasVideo ? handleMouseMove : undefined}
                    onClick={hasVideo ? () => setLightboxProject(project) : undefined}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-2 px-1">
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-neutral-600">
                      <span className="font-medium">{project.type}</span>
                      {project.role && (
                        <>
                          <span className="text-neutral-400">·</span>
                          <span>{project.role}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxProject && (
        <VideoLightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </>
  );
};

export default OtherProjects;
