import { useEffect } from 'react';
import { PortfolioProject, Language, CustomizationOptions } from '../types';
import { TRANSLATIONS } from '../portfolioData';
import { X, Calendar, User, Settings, ExternalLink, Film } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  currentLang: Language;
  options: CustomizationOptions;
}

export default function ProjectModal({
  project,
  onClose,
  currentLang,
  options,
}: ProjectModalProps) {
  const t = TRANSLATIONS;

  // Add escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const modalBg = 
    options.theme === 'light' ? 'bg-[#F7F7F7] border-[#1A1A1A] text-[#1A1A1A]' :
    options.theme === 'sepia' ? 'bg-[#f4efe6] border-[#e2d3c1] text-[#2c241c]' :
    options.theme === 'cinematic' ? 'bg-[#0a0a0a] border-zinc-900 text-zinc-200' :
    'bg-[#18181b] border-zinc-800 text-zinc-200';

  const detailLabelColor = 
    options.theme === 'light' ? 'text-zinc-700' :
    options.theme === 'sepia' ? 'text-[#6e5843]' : 'text-zinc-500';

  const fontClass = 
    options.fontFamily === 'serif' ? 'font-serif' : 
    options.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const outlineAccentBorder = 
    options.accentColor === 'amber' ? 'border-amber-500/20' :
    options.accentColor === 'emerald' ? 'border-emerald-500/20' :
    options.accentColor === 'blue' ? 'border-blue-500/20' :
    options.accentColor === 'crimson' ? 'border-red-500/20' :
    'border-zinc-400/20';

  const accentColorText = 
    options.accentColor === 'amber' ? 'text-amber-500' :
    options.accentColor === 'emerald' ? 'text-emerald-500' :
    options.accentColor === 'blue' ? 'text-blue-500' :
    options.accentColor === 'crimson' ? 'text-red-500' :
    'text-zinc-400';

  const badgeBg = 
    options.theme === 'light' ? 'bg-zinc-100 text-zinc-800' :
    options.theme === 'sepia' ? 'bg-[#dfd5c4]/60 text-[#2c241c]' :
    options.theme === 'cinematic' ? 'bg-zinc-900 text-zinc-300' :
    'bg-zinc-800 text-zinc-300';

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 ${fontClass}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Semi-transparent dark overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-5xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-scaleIn z-10 ${
          options.theme === 'light' ? 'rounded-none border-[#1A1A1A]' : 'rounded-2xl'
        } ${modalBg}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 transition-all duration-200 ${
            options.theme === 'light' 
              ? 'rounded-none bg-[#1A1A1A] text-[#F7F7F7] hover:bg-[#F7F7F7] hover:text-[#1A1A1A] border border-[#1A1A1A]' 
              : 'rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-105'
          }`}
          aria-label={t.closeProject[currentLang]}
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Media Showcase (Video embed or Image zoom) */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[250px] md:min-h-[450px]">
          {project.category === 'film' && project.videoUrl ? (
            /* Widescreen Video Embed */
            <div className="w-full aspect-video">
              <iframe
                src={`${project.videoUrl}?autoplay=0&mute=0`}
                title={project.title[currentLang]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            /* Vertical/Square High-Resolution Image */
            <div className="w-full h-full max-h-[50vh] md:max-h-full flex items-center justify-center p-4">
              <img
                src={project.imageUrl}
                alt={project.title[currentLang]}
                referrerPolicy="no-referrer"
                className={`w-full h-full max-h-[45vh] md:max-h-[75vh] object-contain shadow-md transition-all duration-300 ${
                  options.theme === 'light' ? 'rounded-none border border-[#1A1A1A]' : 'rounded-lg'
                }`}
              />
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Project info list & description */}
        <div className="w-full md:w-2/5 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[45vh] md:max-h-[90vh] border-t md:border-t-0 md:border-l border-current/10">
          <div className="space-y-6">
            {/* Meta Tags */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-0.5 border ${
                options.theme === 'light' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A] rounded-none' 
                  : `rounded-md ${outlineAccentBorder} ${accentColorText}`
              }`}>
                {project.category === 'film' ? t.films[currentLang] :
                 project.category === 'poster' ? t.posters[currentLang] :
                 project.category === 'design' ? t.designs[currentLang] :
                 t.others[currentLang]}
              </span>
              <span className={`text-xs font-mono flex items-center gap-1 ${detailLabelColor}`}>
                <Calendar className="w-3.5 h-3.5" /> {project.year}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                {project.title[currentLang]}
              </h2>
              <p className={`text-sm mt-1 font-mono italic opacity-75 ${accentColorText}`}>
                {project.shortDesc[currentLang]}
              </p>
            </div>

            {/* Localized Long Description */}
            <div className="prose prose-sm leading-relaxed text-sm opacity-90 border-t border-current/5 pt-4">
              <p className="font-sans leading-relaxed whitespace-pre-line">
                {project.longDesc[currentLang]}
              </p>
            </div>

            {/* Structural Metadata (Role, Tools) */}
            <div className="space-y-3.5 pt-4 border-t border-current/5 text-xs">
              <div className="flex items-start gap-2.5">
                <User className={`w-4 h-4 mt-0.5 opacity-60 ${accentColorText}`} />
                <div>
                  <span className={`font-mono block uppercase text-[10px] font-semibold ${detailLabelColor}`}>
                    {t.roleLabel[currentLang]}
                  </span>
                  <span className="font-sans font-medium text-sm">
                    {project.role[currentLang]}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Settings className={`w-4 h-4 mt-0.5 opacity-60 ${accentColorText}`} />
                <div>
                  <span className={`font-mono block uppercase text-[10px] font-semibold ${detailLabelColor}`}>
                    {t.toolsLabel[currentLang]}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.tools.map((tool) => (
                      <span 
                        key={tool} 
                        className={`px-2 py-0.5 text-[10px] font-mono font-medium ${
                          options.theme === 'light'
                            ? 'bg-transparent text-[#1A1A1A] border border-[#1A1A1A] rounded-none'
                            : `${badgeBg} rounded`
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick feedback action (e.g. Vimeo/Artstation reference if applicable) */}
          <div className="mt-8 pt-4 border-t border-current/5 flex items-center justify-between text-[11px] font-mono opacity-60">
            <span>ID: PORTFOLIO-{project.id}</span>
            <span className="flex items-center gap-1">
              {currentLang === 'de' ? 'Vorschau bereit' : currentLang === 'uk' ? 'Перегляд' : 'Preview Active'} <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
