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
    embedUrl: "https://player.xinpianchang.com/?aid=12790938&mid=1xNm498ZdOywEBVK",
  },
  {
    id: 1,
    title: "Cartier | Clash de Cartier",
    type: "商业广告",
    role: "执行导演",
    image: "/project2.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12798817&mid=Xl5M7nV930a7kKEg",
  },
  {
    id: 2,
    title: "中国消防119蓝朋友本色",
    type: "公益宣传片",
    role: "创意、执行导演",
    image: "/project1.png",
    embedUrl: "https://player.xinpianchang.com/?aid=12791989&mid=36Jm4a8RAGpwyjzB",
  },
  {
    id: 3,
    title: "Stormshot",
    type: "SLG+解谜射击游戏",
    role: "策划",
    description: "Stormshot是一款SLG+解谜射击游戏，主打美国市场，一年内收入过亿。买量素材着重展示 minigame 的休闲玩法。",
    image: "/project3.png",
  },
  {
    id: 4,
    title: "Dateback",
    type: "VR 游戏",
    role: "制作人",
    description: "一款第一人称视角的疗愈型 VR 游戏，融合了叙事、解谜等元素。",
    image: "/project7.png",
  },
  {
    id: 5,
    title: "日日晴",
    type: "剧情短片",
    role: "制片",
    image: "/project5.png",
    description: "本科毕设剧情短片《日日晴》入围荷兰 Cinekid 电影节（世界最大的儿童电影节）, 入围澳门国际微电影节（学生组）",
    embedUrl: "https://player.xinpianchang.com/?aid=12045067&mid=z3Yn57pezRAwdDAa",
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
    description: "结合节日或特殊节点进行活动运营，分析用户对内容的偏好，负责玩法策划、提供页面视觉需求并完成搭建，多个活动获得站内外100w+点击，极大提高站内用户召回率",
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
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleVideoError = () => {
    console.error('Video failed to load:', project.embedUrl);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully:', project.embedUrl);
    setVideoLoaded(true);
  };

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
                href={project.embedUrl}
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
              src={`${project.embedUrl}&autoplay=1`}
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!isMobile) cursorRef.current?.show();
  };
  const handleMouseLeave = () => {
    if (!isMobile) cursorRef.current?.hide();
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) cursorRef.current?.updatePosition(e.clientX, e.clientY);
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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
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
            className="columns-2 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12"
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
                    onMouseEnter={hasVideo && !isMobile ? handleMouseEnter : undefined}
                    onMouseLeave={hasVideo && !isMobile ? handleMouseLeave : undefined}
                    onMouseMove={hasVideo && !isMobile ? handleMouseMove : undefined}
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
                      {project.description && (
                        <span className="text-neutral-400">{project.description}</span>
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
