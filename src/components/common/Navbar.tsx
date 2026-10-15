import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import { 
  Sparkles, 
  Calendar, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X,
  HeartHandshake
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openSettings }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const navLinks = [
    { id: 'landing', label: t.nav.home },
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'cycle', label: t.nav.cycleCare, icon: Calendar },
    { id: 'pcos', label: t.nav.pcosCare, icon: HeartHandshake },
    { id: 'ai', label: t.nav.aiInterpreter, icon: Sparkles },
    { id: 'analytics', label: t.nav.analytics, icon: Activity },
    { id: 'report', label: t.nav.report, icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-softPink-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brandPurple to-brandPurple-hover flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6 text-softPink" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.5 5 7 8 7 11.5C7 15 9.5 17.5 12 17.5C14.5 17.5 17 15 17 11.5C17 8 14.5 5 12 2Z" />
                <circle cx="12" cy="19.5" r="2.5" fill="#E9A3C7" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-nearBlack font-display">
                  NAARI <span className="text-brandPurple font-bold">AI</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-softPink text-nearBlack rounded-full border border-blush/40">
                  Care Platform
                </span>
              </div>
              <p className="text-[11px] text-mutedText font-medium tracking-wide">
                Small Symptoms, Big Answers.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-softPink text-brandPurple font-semibold shadow-xs'
                      : 'text-nearBlack hover:text-brandPurple hover:bg-softPink-light'
                  }`}
                >
                  {item.icon && <item.icon className={`w-4 h-4 ${isActive ? 'text-brandPurple' : 'text-blush-dark'}`} />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language & Privacy */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-softPink-border bg-softPink-light text-nearBlack text-xs font-medium hover:bg-softPink transition"
                title="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-brandPurple" />
                <span>{languages.find(l => l.code === language)?.native || 'English'}</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-premium border border-softPink-border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between transition ${
                        language === l.code 
                          ? 'bg-softPink text-brandPurple font-semibold' 
                          : 'text-nearBlack hover:bg-softPink-light'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-mutedText uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy & Settings Button */}
            <button
              onClick={openSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-softPink-border text-nearBlack text-xs font-medium hover:bg-softPink-surface transition"
              title="Privacy Controls & Settings"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brandPurple" />
              <span>{t.nav.privacy}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher button */}
            <button
              onClick={() => {
                const nextLang: Record<Language, Language> = { en: 'kn', kn: 'te', te: 'hi', hi: 'en' };
                setLanguage(nextLang[language]);
              }}
              className="px-2.5 py-1 rounded-md bg-softPink text-brandPurple text-xs font-semibold"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-nearBlack hover:bg-softPink-light focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brandPurple" /> : <Menu className="w-6 h-6 text-nearBlack" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-softPink-border px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navLinks.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 ${
                  isActive
                    ? 'bg-softPink text-brandPurple font-semibold'
                    : 'text-nearBlack hover:bg-softPink-light'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-brandPurple" />}
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-softPink-border/60 flex items-center justify-between">
            <button
              onClick={() => {
                openSettings();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-medium text-brandPurple py-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {t.settings.title}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
