'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { staggerFadeInUp } from '../utils/animations';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Footer columns staggered reveal
    if (columnsRef.current && footerRef.current) {
      const columns = columnsRef.current.querySelectorAll('.footer-column');
      staggerFadeInUp(columns, {
        duration: 0.6,
        stagger: 0.1,
        distance: 30,
        trigger: footerRef.current,
        start: 'top 80%',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const experiences = [
    {
      company: "比亚迪汽车销售有限公司",
      position: "目经理、监制、制片",
      period: "2025.07-至今",
    },
    {
      company: "趣加科技有限公司",
      position: "游戏广告设计师",
      period: "2023.03-2023.06",
    },
    {
      company: "北京快手科技有限公司",
      position: "内容运营",
      period: "2021.06-2021.09",
    },
  ];

  const education = [
    {
      education: "中国传媒大学",
      major: "广播电视（数字创意设计方向）",
      period: "2022.09-2025.06",
    },
    {
      education: "韩国艺术综合大学",
      major: "动画",
      period: "2024.09-2025.01",
    },
    {
      education: "中国传媒大学",
      major: "数字媒体艺术（数字影视与网络视频制作方向）",
      period: "2018.09-2022.06",
    },
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-neutral-950 text-neutral-50 py-20 md:py-32 px-6 md:px-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <div 
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16"
        >
          {/* Brand/Name Column */}
          <div className="space-y-4 footer-column animate-element" style={{ opacity: 0 }}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              王帅鸥
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              监制 · 制片
            </p>
          </div>

          <div className="space-y-6 footer-column animate-element" style={{ opacity: 0 }}>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-400">
              教育经历
            </h4>
            <div className="space-y-4">
            {education.map((education, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-neutral-50 font-medium">{education.education}</p>
                  <p className="text-neutral-400 text-sm">{education.major}</p>
                  <p className="text-neutral-500 text-xs tracking-wider">
                    {education.period}
                  </p>
                </div>
              ))}  
            </div>
          </div>

          {/* Experience Column */}
          <div className="space-y-6 footer-column animate-element" style={{ opacity: 0 }}>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-400">
              工作经历
            </h4>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-neutral-50 font-medium">{exp.company}</p>
                  <p className="text-neutral-400 text-sm">{exp.position}</p>
                  <p className="text-neutral-500 text-xs tracking-wider">
                    {exp.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          

          {/* Contact Column */}
          <div className="space-y-6 footer-column animate-element" style={{ opacity: 0 }}>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-400">
              联系方式
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-neutral-50 text-sm">
                wso18345199656@163.com
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-neutral-50 text-sm">
                  +86 18345199656
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-neutral-50 text-sm">
                  深圳 · 中国
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2026 王帅鸥. All rights reserved.</p>
            <p className="tracking-wider">Portfolio 2024-2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
