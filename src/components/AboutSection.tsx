import React, { useState } from 'react';
import { Language, CustomizationOptions } from '../types';
import { TRANSLATIONS, SKILLS } from '../portfolioData';
import { Mail, Briefcase, GraduationCap, ArrowRight, CheckCircle2, Send, Heart } from 'lucide-react';
import ScrollytellingTimeline from './ScrollytellingTimeline';

interface AboutSectionProps {
  currentLang: Language;
  options: CustomizationOptions;
}

export default function AboutSection({ currentLang, options }: AboutSectionProps) {
  const t = TRANSLATIONS;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate lightweight form submit
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const accentBgClass = 
    options.accentColor === 'amber' ? 'bg-amber-500 hover:bg-amber-600 text-black' :
    options.accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600 text-black' :
    options.accentColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
    options.accentColor === 'crimson' ? 'bg-red-500 hover:bg-red-600 text-white' :
    'bg-zinc-400 hover:bg-zinc-500 text-black';

  const accentTextClass = 
    options.accentColor === 'amber' ? 'text-amber-500' :
    options.accentColor === 'emerald' ? 'text-emerald-500' :
    options.accentColor === 'blue' ? 'text-blue-500' :
    options.accentColor === 'crimson' ? 'text-red-500' :
    'text-zinc-400';

  const accentBorderClass = 
    options.accentColor === 'amber' ? 'focus:border-amber-500 focus:ring-amber-500/20' :
    options.accentColor === 'emerald' ? 'focus:border-emerald-500 focus:ring-emerald-500/20' :
    options.accentColor === 'blue' ? 'focus:border-blue-500 focus:ring-blue-500/20' :
    options.accentColor === 'crimson' ? 'focus:border-red-500 focus:ring-red-500/20' :
    'focus:border-zinc-400 focus:ring-zinc-400/20';

  const cardClass = 
    options.theme === 'light' ? 'border-[#1A1A1A] bg-[#F7F7F7] text-[#1A1A1A] rounded-none' :
    options.theme === 'sepia' ? 'border-[#e2d3c1] bg-[#f7f2ea]/70 text-[#2c241c] rounded-xl' :
    options.theme === 'cinematic' ? 'border-zinc-900 bg-zinc-950/40 text-zinc-200' :
    'border-zinc-800 bg-[#1e1e24]/40 text-zinc-100 rounded-xl';

  const inputClass = 
    options.theme === 'light' ? 'bg-white text-[#1A1A1A] border-[#1A1A1A] rounded-none' :
    options.theme === 'sepia' ? 'bg-[#efeadf] text-[#2c241c] border-[#dfd5c4] rounded-md' :
    options.theme === 'cinematic' ? 'bg-zinc-950 text-zinc-200 border-zinc-900 rounded-md' :
    'bg-[#1c1c20] text-zinc-200 border-zinc-800 rounded-md';

  const buttonClass = 
    options.theme === 'light' ? 'bg-[#1A1A1A] text-[#F7F7F7] border border-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-[#1A1A1A] rounded-none' : accentBgClass;

  const detailLabelColor = 
    options.theme === 'light' ? 'text-zinc-700' :
    options.theme === 'sepia' ? 'text-[#6e5843]' : 'text-zinc-500';

  return (
    <section id="about" className="py-20 scroll-mt-6 border-t border-current/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Localized Bio & Contact Form */}
        <div className="lg:col-span-7 space-y-12">
          {/* Bio block */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest opacity-60">
              {currentLang === 'de' ? 'KÜNSTLERPROFIL' : currentLang === 'uk' ? 'ПРОФІЛЬ МИТЦЯ' : 'ARTIST PROFILE'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.aboutTitle[currentLang]}
            </h2>
            <p className={`text-base font-mono italic ${accentTextClass}`}>
              {t.aboutSubtitle[currentLang]}
            </p>
            <p className={`text-sm leading-relaxed max-w-2xl font-sans opacity-95`}>
              {t.aboutBio[currentLang]}
            </p>
          </div>

          {/* Voluntary Engagement Section */}
          <div className={`p-6 border transition-all duration-300 ${cardClass} space-y-4`}>
            <h4 className="text-xs font-mono uppercase tracking-widest opacity-70 flex items-center gap-2">
              <Heart className={`w-3.5 h-3.5 ${accentTextClass} animate-pulse`} />
              <span>{currentLang === 'de' ? 'Ehrenamtliche Tätigkeit' : currentLang === 'uk' ? 'Громадська діяльність' : 'Volunteer Work'}</span>
            </h4>
            <div className="space-y-3 font-sans opacity-95 text-xs">
              <p className="font-semibold text-sm leading-tight text-current">
                Bündnis für Demokratie und Weltoffenheit Kloster Veßra
              </p>
              <p className="font-semibold text-sm leading-tight border-b border-current/10 pb-2 text-current">
                Deutsch – Ukrainische Gesellschaft Ortenau e.V.
              </p>
              <p className="text-[11px] font-mono opacity-80 mt-1 leading-snug">
                🔧 {currentLang === 'de' ? 'Hilfe bei Übersetzung, Gestaltung und Kommunikation' :
                    currentLang === 'uk' ? 'Допомога в перекладі, дизайні та комунікації' :
                    'Assistance in translation, visual design, and communication'}
              </p>
            </div>
          </div>

          {/* Personal Hobbies & Interests Section */}
          <div className={`p-6 border transition-all duration-300 ${cardClass} space-y-4`}>
            <h4 className="text-xs font-mono uppercase tracking-widest opacity-70 flex items-center gap-2">
              <span className={`w-3.5 h-3.5 ${accentTextClass} text-center font-bold`}>✦</span>
              <span>{currentLang === 'de' ? 'Persönliche Hobbies' : currentLang === 'uk' ? 'Особисті інтереси' : 'Hobbies & Interests'}</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                currentLang === 'de' ? 'Sprachen lernen' : currentLang === 'uk' ? 'Вивчення мов' : 'Learning Languages',
                currentLang === 'de' ? 'Malen & Gestalten' : currentLang === 'uk' ? 'Малювання та дизайн' : 'Painting & Designing',
                currentLang === 'de' ? 'Lesen & Literatur' : currentLang === 'uk' ? 'Читання та література' : 'Reading & Literature'
              ].map((hobby, index) => (
                <span 
                  key={index}
                  className={`text-xs font-sans px-3 py-1 border transition-colors duration-200 ${
                    options.theme === 'light' 
                      ? 'border-[#1A1A1A] bg-transparent text-[#1A1A1A] rounded-none' 
                      : 'border-current/15 bg-current/5 rounded-full'
                  }`}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Contact form panel */}
          <div id="contact" className={`p-6 sm:p-8 border scroll-mt-24 transition-all duration-300 ${cardClass}`}>
            <h3 className="text-lg font-bold tracking-tight mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 opacity-80" /> {t.contactTitle[currentLang]}
            </h3>
            <p className={`text-xs ${detailLabelColor} mb-6`}>
              {t.contactDesc[currentLang]}
            </p>

            {submitted ? (
              <div className={`p-4 ${options.theme === 'light' ? 'rounded-none border-[#1A1A1A] bg-[#1A1A1A]/5 text-[#1A1A1A]' : 'rounded-lg bg-emerald-500/10 border-emerald-500/20 text-emerald-500'} border flex items-start gap-3 animate-fadeIn text-xs`}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">
                  {t.contactSuccess[currentLang]}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                      {t.contactName[currentLang]}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full p-2.5 text-xs font-sans border focus:outline-none focus:ring-1 transition-all ${inputClass} ${accentBorderClass}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                      {t.contactEmail[currentLang]}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-2.5 text-xs font-sans border focus:outline-none focus:ring-1 transition-all ${inputClass} ${accentBorderClass}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                    {t.contactMessage[currentLang]}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-2.5 text-xs font-sans border focus:outline-none focus:ring-1 transition-all resize-none ${inputClass} ${accentBorderClass}`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${buttonClass}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contactSend[currentLang]}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Timeline & Tools */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Education Timeline */}
          <ScrollytellingTimeline currentLang={currentLang} options={options} />

          {/* Software Toolset */}
          <div className="space-y-5">
            <h3 className="text-sm font-mono uppercase tracking-wider border-b border-current/10 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 opacity-80" /> {t.skillsTitle[currentLang]}
            </h3>
            
            <div className="space-y-4">
              {SKILLS.map((skillGroup, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className={`text-[11px] font-mono font-semibold opacity-70 uppercase`}>
                    {skillGroup.category[currentLang]}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => {
                      const skillText = typeof skill === 'string' ? skill : (skill as any)[currentLang];
                      return (
                        <span
                          key={typeof skill === 'string' ? skill : skill.en}
                          className={`text-xs font-mono px-2.5 py-1 border transition-colors duration-200 ${
                            options.theme === 'light' 
                              ? 'border-[#1A1A1A] bg-transparent text-[#1A1A1A] rounded-none hover:bg-white' 
                              : 'border-current/10 bg-current/2 rounded-md hover:border-current/30 hover:bg-current/4'
                          }`}
                        >
                          {skillText}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
