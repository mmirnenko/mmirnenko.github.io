import { useState } from 'react';
import { Language, CustomizationOptions } from '../types';
import { TRANSLATIONS } from '../portfolioData';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  options: CustomizationOptions;
  onOpenCustomizer: () => void;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  options,
  onOpenCustomizer,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS;

  const fontClass = 
    options.fontFamily === 'serif' ? 'font-serif' : 
    options.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const accentColorClass = 
    options.accentColor === 'amber' ? 'text-amber-500 hover:text-amber-600' :
    options.accentColor === 'emerald' ? 'text-emerald-500 hover:text-emerald-600' :
    options.accentColor === 'blue' ? 'text-blue-500 hover:text-blue-600' :
    options.accentColor === 'crimson' ? 'text-red-500 hover:text-red-600' :
    'text-zinc-400 hover:text-zinc-200';

  const accentBorderClass = 
    options.accentColor === 'amber' ? 'hover:border-amber-500' :
    options.accentColor === 'emerald' ? 'hover:border-emerald-500' :
    options.accentColor === 'blue' ? 'hover:border-blue-500' :
    options.accentColor === 'crimson' ? 'hover:border-red-500' :
    'hover:border-zinc-400';

  const hoverAccentClass = 
    options.accentColor === 'amber' ? 'hover:text-amber-500' :
    options.accentColor === 'emerald' ? 'hover:text-emerald-500' :
    options.accentColor === 'blue' ? 'hover:text-blue-500' :
    options.accentColor === 'crimson' ? 'hover:text-red-500' :
    'hover:text-zinc-200';

  const themeNavBg = 
    options.theme === 'light' ? 'bg-[#F7F7F7]/95 border-[#1A1A1A] text-[#1A1A1A]' :
    options.theme === 'sepia' ? 'bg-[#f4efe6]/90 border-[#e2d3c1] text-[#2c241c]' :
    options.theme === 'cinematic' ? 'bg-black/90 border-zinc-900 text-zinc-300' :
    'bg-[#121214]/90 border-zinc-800 text-zinc-200';

  const navLinks = [
    { href: '#works', label: t.works[currentLang] },
    { href: '#about', label: t.aboutMe[currentLang] },
    { href: '#contact', label: t.contact[currentLang] },
  ];

  return (
    <header 
      id="portfolio-header"
      className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${themeNavBg} ${fontClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          id="brand-logo"
          className="flex flex-col items-start focus:outline-none group"
        >
          <span className="text-lg font-bold tracking-tighter transition-colors duration-200">
            {t.brand[currentLang]}
          </span>
          <span className="text-[10px] tracking-widest uppercase opacity-60 font-mono">
            {currentLang === 'de' ? 'Medienproduktion' : currentLang === 'uk' ? 'Медіа' : 'Media Production'}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 py-1 font-semibold ${hoverAccentClass} hover:underline decoration-2 underline-offset-4`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Menu */}
        <div id="nav-actions" className="hidden md:flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1.5 text-xs border border-current/10 rounded-full px-2.5 py-1">
            <Globe className="w-3.5 h-3.5 opacity-60" />
            {(['en', 'de', 'uk'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-1.5 py-0.5 rounded uppercase font-mono font-semibold transition-all duration-200 ${
                  currentLang === lang 
                    ? 'opacity-100 bg-current/10' 
                    : 'opacity-40 hover:opacity-80'
                }`}
                title={lang === 'en' ? 'English' : lang === 'de' ? 'Deutsch' : 'Українська'}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggles */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-current/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className={`md:hidden border-t border-current/10 p-6 flex flex-col space-y-6 animate-fadeIn ${themeNavBg}`}
        >
          <nav className="flex flex-col space-y-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-current/5"
              >
                <span>{link.label}</span>
                <ArrowUpRight className={`w-4 h-4 ${accentColorClass}`} />
              </a>
            ))}
          </nav>

          {/* Language Selector in Mobile Drawer */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs opacity-60 font-mono uppercase flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> Language / Sprache / Мова
            </span>
            <div className="flex space-x-3 text-sm">
              {[
                { code: 'en', label: 'English' },
                { code: 'de', label: 'Deutsch' },
                { code: 'uk', label: 'Українська' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code as Language);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200 ${
                    currentLang === lang.code 
                      ? 'border-current bg-current/10 font-bold' 
                      : 'border-current/15 opacity-60'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
