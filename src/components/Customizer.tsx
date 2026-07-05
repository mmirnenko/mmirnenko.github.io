import { CustomizationOptions, Language } from '../types';
import { TRANSLATIONS } from '../portfolioData';
import { X, Sliders, Check, Eye, EyeOff, LayoutGrid, List } from 'lucide-react';

interface CustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  options: CustomizationOptions;
  onOptionsChange: (newOptions: CustomizationOptions) => void;
  currentLang: Language;
}

export default function Customizer({
  isOpen,
  onClose,
  options,
  onOptionsChange,
  currentLang,
}: CustomizerProps) {
  const t = TRANSLATIONS;

  const handleOptionChange = <K extends keyof CustomizationOptions>(
    key: K,
    value: CustomizationOptions[K]
  ) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const handleReset = () => {
    onOptionsChange({
      theme: 'dark',
      accentColor: 'amber',
      fontFamily: 'sans',
      filmGrain: true,
      layoutDensity: 'comfortable',
    });
  };

  const themeOptions = [
    { value: 'dark', label: { en: 'Slate Dark', de: 'Schiefer Dunkel', uk: 'Темний сланець' }, class: 'bg-[#121214] border-zinc-800 text-zinc-100' },
    { value: 'light', label: { en: 'Artistic Light', de: 'Galerie Weiß', uk: 'Мистецький світлий' }, class: 'bg-[#F7F7F7] border-[#1A1A1A] text-[#1A1A1A]' },
    { value: 'cinematic', label: { en: 'Film Black', de: 'Kino Schwarz', uk: 'Кінематографічний' }, class: 'bg-[#000000] border-zinc-900 text-zinc-100' },
    { value: 'sepia', label: { en: 'Antique Sepia', de: 'Antikes Sepia', uk: 'Антична сепія' }, class: 'bg-[#f4efe6] border-[#e2d3c1] text-[#2c241c]' },
  ];

  const accentOptions = [
    { value: 'amber', class: 'bg-amber-500', name: { en: 'Cinema Amber', de: 'Kino-Bernstein', uk: 'Янтарний' } },
    { value: 'emerald', class: 'bg-emerald-500', name: { en: 'Neon Emerald', de: 'Smaragd-Grün', uk: 'Смарагдовий' } },
    { value: 'blue', class: 'bg-blue-500', name: { en: 'Cobalt Blue', de: 'Kobalt-Blau', uk: 'Кобальтовий' } },
    { value: 'crimson', class: 'bg-red-500', name: { en: 'Raw Crimson', de: 'Karmesin-Rot', uk: 'Карміновий' } },
    { value: 'slate', class: 'bg-zinc-400', name: { en: 'Monochrome', de: 'Monochrom', uk: 'Монохром' } },
  ];

  const fontOptions = [
    { value: 'sans', label: 'Inter (Sans)', desc: { en: 'Modern UI & layout', de: 'Modernes Layout', uk: 'Сучасний стиль' } },
    { value: 'serif', label: 'Playfair (Serif)', desc: { en: 'Cinematic / editorial', de: 'Cinematisch / Editorial', uk: 'Кіно & Видання' } },
    { value: 'mono', label: 'JetBrains (Mono)', desc: { en: 'Technical studio data', de: 'Technisches Datenblatt', uk: 'Технічна студія' } },
  ];

  const sidebarBg = 
    options.theme === 'light' ? 'bg-[#F7F7F7] border-[#1A1A1A] text-[#1A1A1A]' :
    options.theme === 'sepia' ? 'bg-[#f4efe6] border-[#e2d3c1] text-[#2c241c]' :
    options.theme === 'cinematic' ? 'bg-[#0a0a0a] border-zinc-900 text-zinc-200' :
    'bg-[#18181b] border-zinc-800 text-zinc-200';

  const overlayBg = isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none';
  const sidebarTransform = isOpen ? 'translate-x-0' : 'translate-x-full';

  return (
    <>
      {/* Semi-transparent Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${overlayBg}`}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <aside
        id="customizer-sidebar"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm border-l p-6 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${sidebarBg} ${sidebarTransform}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 opacity-80" />
            <h2 className="font-semibold text-base">{t.customizerTitle[currentLang]}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-current/5 transition-all"
            aria-label="Close Customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs opacity-75 mb-6 leading-relaxed font-mono">
          {t.customizerDesc[currentLang]}
        </p>

        {/* Customization Controls */}
        <div className="space-y-6">
          {/* 1. THEME SELECTION */}
          <div className="space-y-2.5">
            <label className="text-xs uppercase tracking-wider font-semibold font-mono opacity-80">
              {t.themeLabel[currentLang]}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionChange('theme', opt.value as any)}
                  className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${opt.class} ${
                    options.theme === opt.value
                      ? 'ring-2 ring-offset-2 ring-current border-transparent'
                      : 'border-current/15 opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="text-xs font-semibold">{opt.label[currentLang]}</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-50 font-mono">
                    {opt.value}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. ACCENT COLOR PICKER */}
          <div className="space-y-2.5">
            <label className="text-xs uppercase tracking-wider font-semibold font-mono opacity-80">
              {t.accentLabel[currentLang]}
            </label>
            <div className="flex flex-wrap gap-2.5">
              {accentOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionChange('accentColor', opt.value as any)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center relative transition-transform hover:scale-105 ${opt.class}`}
                  title={opt.name[currentLang]}
                >
                  {options.accentColor === opt.value && (
                    <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono opacity-60 italic">
              Selected: {accentOptions.find((a) => a.value === options.accentColor)?.name[currentLang]}
            </span>
          </div>

          {/* 3. TYPOGRAPHY SWITCH */}
          <div className="space-y-2.5">
            <label className="text-xs uppercase tracking-wider font-semibold font-mono opacity-80">
              {t.fontLabel[currentLang]}
            </label>
            <div className="space-y-2">
              {fontOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionChange('fontFamily', opt.value as any)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                    options.fontFamily === opt.value
                      ? 'border-current bg-current/5 font-medium'
                      : 'border-current/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-col">
                    <span 
                      className={`text-sm ${
                        opt.value === 'serif' ? 'font-serif' : opt.value === 'mono' ? 'font-mono' : 'font-sans'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[10px] opacity-60 font-mono">
                      {opt.desc[currentLang]}
                    </span>
                  </div>
                  {options.fontFamily === opt.value && <Check className="w-4 h-4 text-current" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. ANALOG FILM GRAIN OVERLAY */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-semibold font-mono opacity-80">
                {t.grainLabel[currentLang]}
              </label>
              <button
                onClick={() => handleOptionChange('filmGrain', !options.filmGrain)}
                className="text-xs font-mono font-bold opacity-80 hover:opacity-100 flex items-center gap-1.5"
              >
                {options.filmGrain ? (
                  <>
                    <Eye className="w-4 h-4 text-current" />
                    <span className="text-emerald-500 uppercase">On</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 opacity-50" />
                    <span className="opacity-50 uppercase">Off</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] opacity-60 leading-relaxed font-mono">
              Injects a subtle, retro grain simulation. Disabling it saves minor battery power on extremely old smartphones.
            </p>
          </div>

          {/* 5. LAYOUT DENSITY */}
          <div className="space-y-2.5">
            <label className="text-xs uppercase tracking-wider font-semibold font-mono opacity-80">
              {t.densityLabel[currentLang]}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleOptionChange('layoutDensity', 'comfortable')}
                className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all text-xs font-mono ${
                  options.layoutDensity === 'comfortable'
                    ? 'border-current bg-current/5 font-bold'
                    : 'border-current/15 opacity-60 hover:opacity-100'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
              <button
                onClick={() => handleOptionChange('layoutDensity', 'compact')}
                className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all text-xs font-mono ${
                  options.layoutDensity === 'compact'
                    ? 'border-current bg-current/5 font-bold'
                    : 'border-current/15 opacity-60 hover:opacity-100'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Minimal List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-current/10 flex flex-col gap-2">
          <button
            onClick={handleReset}
            className="w-full py-2 border border-current/20 rounded-md text-xs font-mono uppercase tracking-widest text-center hover:bg-current/5 transition-all"
          >
            {t.resetCustomizer[currentLang]}
          </button>
          <span className="text-[9px] text-center font-mono opacity-40 mt-2">
            Settings saved locally inside localStorage
          </span>
        </div>
      </aside>
    </>
  );
}
