import { useState, useEffect } from 'react';
import { Language, CustomizationOptions, PortfolioProject } from './types';
import { TRANSLATIONS } from './portfolioData';
import Navbar from './components/Navbar';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import { ArrowUp, Compass, ExternalLink } from 'lucide-react';
// @ts-ignore
import profilePortrait from './assets/images/profile_portrait_1783277749008.jpg';

const QUOTES = [
  {
    id: 'struggle',
    en: { text: "He who fights, conquers the world." },
    de: { text: "Wer kämpft, erobert die Welt." },
    uk: { text: "Хто борець, той здобуває світ." }
  }
];

export default function App() {
  // Load language from localStorage, default to English ('en')
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'en' || saved === 'de' || saved === 'uk') {
      return saved;
    }
    return 'en';
  });

  // Enforce fixed options requested by the user: Antique Sepia background with Neon Emerald Accent and Playfair(Serif) font.
  const [options] = useState<CustomizationOptions>({
    theme: 'sepia',
    accentColor: 'emerald',
    fontFamily: 'serif',
    filmGrain: true,
    layoutDensity: 'comfortable',
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
  }, [language]);

  // Back to top scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = TRANSLATIONS;

  // Resolve layout wrapper styling classes
  const themeClass = 
    options.theme === 'light' ? 'bg-[#F7F7F7] text-[#1A1A1A] border-[#1A1A1A]' :
    options.theme === 'sepia' ? 'bg-[#f4efe6] text-[#2c241c] border-[#dfd5c4] sepia-vibe' :
    options.theme === 'cinematic' ? 'bg-black text-zinc-200 border-zinc-900 cinematic-vibe' :
    'bg-[#121214] text-zinc-100 border-zinc-800'; // Default dark slate

  const fontClass = 
    options.fontFamily === 'serif' ? 'font-serif' : 
    options.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const accentTextClass = 
    options.accentColor === 'amber' ? 'text-amber-500' :
    options.accentColor === 'emerald' ? 'text-emerald-500' :
    options.accentColor === 'blue' ? 'text-blue-500' :
    options.accentColor === 'crimson' ? 'text-red-500' :
    'text-zinc-400';

  const accentBorderClass = 
    options.accentColor === 'amber' ? 'border-amber-500 hover:border-amber-600 focus:ring-amber-500' :
    options.accentColor === 'emerald' ? 'border-emerald-500 hover:border-emerald-600 focus:ring-emerald-500' :
    options.accentColor === 'blue' ? 'border-blue-500 hover:border-blue-600 focus:ring-blue-500' :
    options.accentColor === 'crimson' ? 'border-red-500 hover:border-red-600 focus:ring-red-500' :
    'border-zinc-400 hover:border-zinc-500 focus:ring-zinc-400';

  const accentBgClass = 
    options.accentColor === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
    options.accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
    options.accentColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
    options.accentColor === 'crimson' ? 'bg-red-500 hover:bg-red-600' :
    'bg-zinc-400 hover:bg-zinc-500';

  const detailLabelColor = 
    options.theme === 'sepia' ? 'text-[#6e5843]' : 'text-zinc-500';

  const actionButtonClass = 
    options.theme === 'light' 
      ? 'px-5 py-2 rounded-none text-xs font-mono uppercase tracking-widest transition-all duration-300 font-bold border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F7]' 
      : `px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 font-semibold border ${accentBorderClass}`;

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${themeClass} ${fontClass}`}>
      {/* 1. Optional hardware-accelerated Analog Film Grain Overlay */}
      {options.filmGrain && <div className="film-grain" aria-hidden="true" />}

      {/* 2. Navigation Bar */}
      <Navbar
        currentLang={language}
        onLanguageChange={setLanguage}
        options={options}
        onOpenCustomizer={() => {}}
      />

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        
        {/* HERO HEADER SECTION */}
        <section id="hero" className="py-12 md:py-20 border-b border-current/10 flex flex-col justify-between min-h-[45vh] md:min-h-[55vh] relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="space-y-6 md:col-span-8">
              {/* Minimal tag */}
              <span className={`text-xs uppercase tracking-widest font-mono ${accentTextClass}`}>
                {language === 'en' ? 'Welcome to my portfolio' : language === 'de' ? 'Willkommen in meinem Portfolio' : 'Ласкаво просимо до мого портфоліо'}
              </span>

              {/* Display Header */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-snug flex items-center italic">
                  <span>
                    “{QUOTES[0][language]?.text || QUOTES[0]['en']?.text}”
                  </span>
                </h1>
              </div>

              {/* Student metadata descriptor */}
              <p className="text-sm sm:text-base opacity-80 leading-relaxed font-sans max-w-xl">
                {language === 'en' && 'Welcome to the digital atelier. I make short films, typography screenprints, and user experiences that translate industrial noise into poetic structures.'}
                {language === 'de' && 'Willkommen im digitalen Atelier. Ich gestalte Kurzfilme, typografische Siebdrucke und Nutzererfahrungen, die industrielles Rauschen in poetische Strukturen übersetzen.'}
                {language === 'uk' && 'Ласкаво просимо до моєї цифрової майстерні. Я створюю короткометражні фільми, шовкотрафаретні плакати та інтерфейси, які перетворюють індустріальний шум на поетичну структуру.'}
              </p>
            </div>

            {/* Profile photo on the right side */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative group p-2 border border-current/20 bg-current/5 rounded-lg overflow-hidden shadow-lg hover:border-current/40 transition-all duration-300 max-w-[280px]">
                <img 
                  src={profilePortrait}
                  alt="Mark Mirnenko portrait" 
                  className="w-full h-auto object-cover brightness-100 contrast-105 transition-all duration-500 rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Quick interactive links / credentials line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-12 border-t border-current/5 mt-10">
            {/* Small student tag */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <Compass className="w-4 h-4 animate-spin-slow opacity-60" />
              <span>{t.metaStudent[language]}</span>
            </div>

            {/* Localized Call to Action - scroll to works */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#works"
                className={actionButtonClass}
              >
                {language === 'en' ? 'View Directory' : language === 'de' ? 'Katalog ansehen' : 'Переглянути каталог'}
              </a>
              <a
                href="#about"
                className="text-xs font-mono uppercase tracking-wider flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <span>{t.aboutMe[language]}</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. Filterable Project Grid & Bento Lists */}
        <ProjectGrid
          currentLang={language}
          options={options}
          onProjectSelect={setSelectedProject}
        />

        {/* 5. Personal Details bio and static mock-contact forms */}
        <AboutSection
          currentLang={language}
          options={options}
        />

      </main>

      {/* 6. Footer section */}
      <footer className="border-t border-current/10 py-12 text-center text-xs opacity-60 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Mark Mirnenko. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>
              {language === 'de' ? 'Mediengestaltung & Produktion Student' : language === 'uk' ? 'Студент медіадизайну та виробництва' : 'Media Design & Production Student'}
            </span>
          </div>
        </div>
      </footer>

      {/* 8. Light-overlay Project details modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentLang={language}
        options={options}
      />

      {/* 9. Floating Back-to-Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top"
          className={`fixed bottom-6 right-6 z-30 p-2.5 rounded-full shadow-lg border text-white transition-all duration-300 hover:scale-105 ${accentBgClass}`}
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-white font-bold" />
        </button>
      )}
    </div>
  );
}
