import React, { useEffect, useRef, useState } from 'react';
import { Language, CustomizationOptions } from '../types';
import { TRANSLATIONS } from '../portfolioData';
import { MapPin, ArrowDown, Sparkles, Navigation } from 'lucide-react';

interface ScrollytellingTimelineProps {
  currentLang: Language;
  options: CustomizationOptions;
}

interface TimelineItemProps {
  key?: any;
  index: number;
  edu: any;
  currentLang: Language;
  options: CustomizationOptions;
  isActive: boolean;
  accentTextClass: string;
  detailLabelColor: string;
}

function TimelineItem({
  index,
  edu,
  currentLang,
  options,
  isActive,
  accentTextClass,
  detailLabelColor,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Geographic coordinates or visual markers to tell the journey
  const locations: Record<number, { city: string; country: string; dist: string }> = {
    4: { city: "Kyiv", country: "Ukraine", dist: "Origin" },
    3: { city: "Suhl", country: "Germany", dist: "1,800 km" },
    2: { city: "Nordhausen", country: "Germany", dist: "130 km" },
    1: { city: "Nordhausen", country: "Germany", dist: "Academic" },
    0: { city: "Offenburg", country: "Germany", dist: "390 km" },
  };

  const loc = locations[index];

  const activeCardBg = 
    options.theme === 'light' 
      ? 'bg-white border-[#1A1A1A] text-[#1A1A1A]' 
      : options.theme === 'sepia'
      ? 'bg-[#efeadf] border-[#dfd5c4] text-[#2c241c]'
      : 'bg-current/10 border-current/20 text-current';

  return (
    <div 
      ref={itemRef}
      id={`timeline-item-${index}`}
      className={`relative pl-8 transition-all duration-700 ease-out ${
        isActive 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-40 translate-x-2 scale-98'
      }`}
    >
      {/* Visual connection dot */}
      <span 
        className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
          isActive 
            ? `${accentTextClass} border-current scale-125 bg-current shadow-[0_0_8px_currentColor]` 
            : 'border-current/30 bg-transparent scale-100'
        }`}
        style={{ left: '-6.5px' }}
      >
        {isActive && (
          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
        )}
      </span>

      {/* Meta Location Label */}
      <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest opacity-60 mb-1">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span>{loc?.city}, {loc?.country}</span>
        {loc?.dist && (
          <span className="px-1 py-0.2 text-[8px] border border-current/20 rounded font-bold ml-1">
            {loc.dist}
          </span>
        )}
      </div>

      <div className={`p-4 border transition-all duration-300 rounded-lg ${
        isActive ? `${activeCardBg} shadow-md` : 'border-transparent bg-transparent'
      }`}>
        {/* Period badge */}
        <span className={`text-[10px] font-mono ${detailLabelColor} block font-bold`}>
          {edu.period}
        </span>
        
        <h4 className="text-sm font-bold tracking-tight leading-snug mt-1">
          {edu.degree[currentLang]}
        </h4>
        
        <p className="text-xs font-medium opacity-80 mt-1">
          {edu.school[currentLang]}
        </p>

        {edu.description && (
          <p className="text-xs mt-2 opacity-90 leading-relaxed font-sans border-t border-current/10 pt-2 transition-all duration-300">
            {edu.description[currentLang]}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ScrollytellingTimeline({ currentLang, options }: ScrollytellingTimelineProps) {
  const t = TRANSLATIONS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const accentTextClass = 
    options.accentColor === 'amber' ? 'text-amber-500' :
    options.accentColor === 'emerald' ? 'text-emerald-500' :
    options.accentColor === 'blue' ? 'text-blue-500' :
    options.accentColor === 'crimson' ? 'text-red-500' :
    'text-zinc-400';

  const detailLabelColor = 
    options.theme === 'light' ? 'text-zinc-700' :
    options.theme === 'sepia' ? 'text-[#6e5843]' : 'text-zinc-500';

  // Calculate scrolling progress and activate milestones accordingly
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how far down the user is relative to this section
      const progressStart = rect.top - windowHeight * 0.5;
      const progressEnd = progressStart + containerHeight;

      let progress = 0;
      if (rect.top <= windowHeight * 0.5) {
        progress = Math.min(Math.max((windowHeight * 0.5 - rect.top) / (containerHeight - 100), 0), 1);
      }
      setScrollProgress(progress);

      // Check which individual items are closest to viewport center
      const items = t.educationList.map((_, i) => document.getElementById(`timeline-item-${i}`));
      let closestIdx = 0;
      let minDistance = Infinity;

      items.forEach((item, idx) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const distanceToCenter = Math.abs(itemRect.top + itemRect.height / 2 - windowHeight / 2);
        if (distanceToCenter < minDistance) {
          minDistance = distanceToCenter;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial call
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [t.educationList]);

  // Cities tracker list for the mini interactive travel map
  const activeCities = [
    { name: "Kyiv", label: "Kyiv (2011)", index: 4 },
    { name: "Suhl", label: "Suhl (2022)", index: 3 },
    { name: "Nordhausen", label: "Nordhausen (2023)", index: 1 },
    { name: "Offenburg", label: "Offenburg (2025)", index: 0 },
  ];

  return (
    <div ref={containerRef} className="space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current/10 pb-3">
        <h3 className="text-sm font-mono uppercase tracking-wider flex items-center gap-2">
          <Navigation className="w-4 h-4 animate-pulse" /> {t.educationTitle[currentLang]}
        </h3>
        
        {/* Interactive Travel HUD */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono opacity-80">
          <span className="font-bold">{currentLang === 'de' ? 'Aktive Station:' : currentLang === 'uk' ? 'Поточна станція:' : 'Current Station:'}</span>
          <span className={`px-2 py-0.5 rounded border border-current/30 font-bold ${accentTextClass} animate-pulse`}>
            {activeIndex === 4 ? "Kyiv, UA" :
             activeIndex === 3 ? "Suhl, DE" :
             activeIndex === 2 || activeIndex === 1 ? "Nordhausen, DE" :
             "Offenburg, DE"}
          </span>
        </div>
      </div>

      {/* Main Scrollytelling Timeline List */}
      <div className="relative pl-0.5 ml-2">
        {/* Dynamic active vertical scroll gauge */}
        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-current/10" style={{ left: '0px' }} />
        
        <div 
          className="absolute left-0 top-2 w-0.5 bg-current transition-all duration-300" 
          style={{ 
            left: '0px',
            height: `${scrollProgress * 100}%`,
            maxHeight: '100%'
          }} 
        />

        <div className="space-y-8 relative">
          {t.educationList.map((edu, index) => (
            <TimelineItem
              key={index}
              index={index}
              edu={edu}
              currentLang={currentLang}
              options={options}
              isActive={activeIndex === index}
              accentTextClass={accentTextClass}
              detailLabelColor={detailLabelColor}
            />
          ))}
        </div>
      </div>

      <div className="text-[9px] font-mono opacity-50 italic text-center pt-2 flex items-center justify-center gap-1">
        <ArrowDown className="w-3 h-3 animate-bounce" />
        <span>{currentLang === 'de' ? 'Scrollen Sie, um der Geschichte zu folgen' : currentLang === 'uk' ? 'Прокручуйте, щоб побачити історію' : 'Scroll to explore the journey'}</span>
      </div>
    </div>
  );
}
