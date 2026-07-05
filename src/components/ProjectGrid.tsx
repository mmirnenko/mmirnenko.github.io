import { useState } from 'react';
import { PortfolioProject, Language, ProjectCategory, CustomizationOptions } from '../types';
import { PROJECTS, TRANSLATIONS } from '../portfolioData';
import { Film, FileImage, Palette, Layers, Play, ArrowUpRight, Grid, List } from 'lucide-react';

interface ProjectGridProps {
  currentLang: Language;
  options: CustomizationOptions;
  onProjectSelect: (project: PortfolioProject) => void;
}

export default function ProjectGrid({
  currentLang,
  options,
  onProjectSelect,
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const t = TRANSLATIONS;

  const filteredProjects = PROJECTS.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );

  const getCategoryIcon = (cat: ProjectCategory) => {
    switch (cat) {
      case 'film':
        return <Film className="w-3.5 h-3.5" />;
      case 'poster':
        return <FileImage className="w-3.5 h-3.5" />;
      case 'design':
        return <Palette className="w-3.5 h-3.5" />;
      case 'other':
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryLabel = (cat: ProjectCategory) => {
    switch (cat) {
      case 'film':
        return t.films[currentLang];
      case 'poster':
        return t.posters[currentLang];
      case 'design':
        return t.designs[currentLang];
      case 'other':
        return t.others[currentLang];
    }
  };

  const categories: (ProjectCategory | 'all')[] = ['all', 'film', 'poster', 'design', 'other'];

  // Theme-specific accent styles
  const activeBtnBg = 
    options.accentColor === 'amber' ? 'bg-amber-500 hover:bg-amber-600 text-black' :
    options.accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600 text-black' :
    options.accentColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
    options.accentColor === 'crimson' ? 'bg-red-500 hover:bg-red-600 text-white' :
    'bg-zinc-400 hover:bg-zinc-500 text-black';

  const cardClass = 
    options.theme === 'light' 
      ? 'border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-white cursor-crosshair rounded-none' 
      : options.theme === 'sepia' 
        ? 'border-[#e2d3c1] bg-[#f7f2ea]/70 text-[#2c241c] cursor-pointer rounded-xl hover:shadow-lg' 
        : options.theme === 'cinematic' 
          ? 'border-zinc-900 bg-zinc-950/40 text-zinc-200 cursor-pointer rounded-xl hover:shadow-lg' 
          : 'border-zinc-800 bg-[#1e1e24]/40 text-zinc-100 cursor-pointer rounded-xl hover:shadow-lg';

  const outlineAccentBorder = 
    options.theme === 'light' ? 'border-[#1A1A1A] text-[#1A1A1A] rounded-none' :
    options.accentColor === 'amber' ? 'focus:ring-amber-500 border-amber-500/20 rounded-md' :
    options.accentColor === 'emerald' ? 'focus:ring-emerald-500 border-emerald-500/20 rounded-md' :
    options.accentColor === 'blue' ? 'focus:ring-blue-500 border-blue-500/20 rounded-md' :
    options.accentColor === 'crimson' ? 'focus:ring-red-500 border-red-500/20 rounded-md' :
    'focus:ring-zinc-400 border-zinc-400/20 rounded-md';

  const detailLabelColor = 
    options.theme === 'light' ? 'text-zinc-700' :
    options.theme === 'sepia' ? 'text-[#6e5843]' : 'text-zinc-500';

  return (
    <section id="works" className="py-16 scroll-mt-6">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-current/10 pb-6">
        <div className="flex flex-wrap gap-1.5" id="category-filters">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? `${activeBtnBg} font-semibold shadow-sm`
                    : 'border border-current/10 hover:border-current/30 hover:bg-current/5'
                }`}
              >
                {cat !== 'all' && getCategoryIcon(cat)}
                <span>{cat === 'all' ? t.all[currentLang] : getCategoryLabel(cat)}</span>
              </button>
            );
          })}
        </div>

        {/* Quick info status */}
        <div className="text-[11px] font-mono opacity-60 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              options.accentColor === 'amber' ? 'bg-amber-400' :
              options.accentColor === 'emerald' ? 'bg-emerald-400' :
              options.accentColor === 'blue' ? 'bg-blue-400' :
              options.accentColor === 'crimson' ? 'bg-red-400' : 'bg-zinc-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              options.accentColor === 'amber' ? 'bg-amber-500' :
              options.accentColor === 'emerald' ? 'bg-emerald-500' :
              options.accentColor === 'blue' ? 'bg-blue-500' :
              options.accentColor === 'crimson' ? 'bg-red-500' : 'bg-zinc-500'
            }`}></span>
          </span>
          <span>
            {currentLang === 'de' 
              ? `${filteredProjects.length} Arbeiten geladen` 
              : currentLang === 'uk' 
                ? `Завантажено ${filteredProjects.length} робіт`
                : `${filteredProjects.length} Works Loaded`}
          </span>
        </div>
      </div>

      {/* RENDER BENTO GRID LAYOUT */}
      {options.layoutDensity === 'comfortable' ? (
        <div 
          id="works-bento-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn"
        >
          {filteredProjects.map((project) => {
            const aspectClass = 
              project.aspectRatio === 'video' ? 'aspect-video' : 
              project.aspectRatio === 'poster' ? 'aspect-[3/4.2]' : 'aspect-square';

            return (
              <article
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`group relative border p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 ${cardClass}`}
              >
                {/* Visual Wrapper */}
                <div className={`relative w-full overflow-hidden bg-zinc-900/10 ${options.theme === 'light' ? 'rounded-none border border-[#1A1A1A] mb-4' : 'rounded-lg mb-4'}`}>
                  <div className={`w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02] ${aspectClass}`}>
                    <img
                      src={project.imageUrl}
                      alt={project.title[currentLang]}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>

                  {/* Icon indicators */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {project.category === 'film' && (
                      <span className="bg-black/75 backdrop-blur-md text-white p-1.5 rounded-full text-[9px] font-mono flex items-center justify-center border border-white/10" title="Film Project">
                        <Play className="w-3 h-3 fill-white" />
                      </span>
                    )}
                    <span className="bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {/* Accent hover vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-mono flex items-center gap-1">
                      {t.viewProject[currentLang]} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 border ${outlineAccentBorder}`}>
                        {getCategoryLabel(project.category)}
                      </span>
                      <span className={`text-[10px] font-mono ${detailLabelColor}`}>
                        {project.tools[0]}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base group-hover:underline decoration-1 underline-offset-4 tracking-tight leading-snug">
                      {project.title[currentLang]}
                    </h3>

                    <p className={`text-xs mt-1.5 line-clamp-2 ${detailLabelColor} font-sans leading-relaxed`}>
                      {project.shortDesc[currentLang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/5 flex items-center justify-between text-[11px] font-mono opacity-80">
                    <span className="truncate max-w-[200px]">
                      {t.roleLabel[currentLang]}: {project.role[currentLang]}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* RENDER COMPACT LIST LAYOUT (High-end minimalistic index) */
        <div 
          id="works-minimal-list"
          className="border-t border-current/10 divide-y divide-current/10 animate-fadeIn"
        >
          {filteredProjects.map((project) => {
            const isHovered = hoveredProject === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onProjectSelect(project)}
                className={`group relative py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all duration-150 px-2 ${
                  options.theme === 'light' ? 'cursor-crosshair hover:bg-white' : 'cursor-pointer hover:bg-current/2'
                }`}
              >
                {/* Desktop hover floating card preview inside standard bounds */}
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <span className={`text-xs font-mono w-10 ${detailLabelColor}`}>
                    {project.year}
                  </span>

                  <span className={`hidden md:inline-flex text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 border h-fit ${outlineAccentBorder}`}>
                    {getCategoryLabel(project.category)}
                  </span>

                  <div className="min-w-0 flex-grow">
                    <h3 className="text-sm sm:text-base font-semibold group-hover:underline underline-offset-4 decoration-1 truncate">
                      {project.title[currentLang]}
                    </h3>
                    <p className="text-xs opacity-60 sm:hidden">
                      {project.role[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between sm:justify-end text-xs font-mono">
                  <span className={`hidden sm:inline opacity-70 truncate max-w-[220px] ${detailLabelColor}`}>
                    {project.role[currentLang]}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="opacity-40 hidden lg:inline">
                      {project.tools.slice(0, 2).join(' / ')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-45 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Inline Hover Image Reveal */}
                {isHovered && (
                  <div className="hidden lg:block absolute left-1/3 -top-12 z-10 pointer-events-none w-48 h-28 rounded-lg overflow-hidden border border-zinc-500/30 shadow-2xl animate-fadeIn bg-zinc-950">
                    <img
                      src={project.imageUrl}
                      alt={project.title[currentLang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
