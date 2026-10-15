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
  HeartHandshake,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openSettings }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
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
            className="flex items-center gap-3 cursor-pointer group shrink-0 select-none py-1"
            title="NAARI AI — Home"
          >
            {/* Reference 3: Official Logo Icon */}
            <div className="relative shrink-0">
              <img 
                src="/naari-logo.png" 
                alt="NAARI AI Official Emblem Logo" 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-soft-purple border border-amber-200/60 group-hover:scale-105 group-hover:rotate-1 transition-all duration-200 bg-white" 
              />
            </div>

            {/* Brand grouping: Name + Pill Badge + Tagline */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2.5 flex-nowrap">
                {/* Reference 2: Brand-name design */}
                <img 
                  src="/naari-wordmark.png" 
                  alt="NAARI" 
                  className="h-6 sm:h-7 w-auto object-contain shrink-0" 
                />

                {/* Reference 1: Small elegant pill-shaped Care Platform badge */}
                <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide bg-softPink text-brandPurple rounded-full border border-blush/40 whitespace-nowrap shadow-2xs">
                  Care Platform
                </span>
              </div>

              {/* Tagline placed below brand name */}
              <p className="text-[10px] sm:text-[11px] text-mutedText font-medium tracking-normal whitespace-nowrap mt-0.5">
                Small Symptoms, Big Answers.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-softPink text-brandPurple font-semibold shadow-xs'
                      : 'text-nearBlack hover:text-brandPurple hover:bg-softPink-light'
                  }`}
                >
                  {item.icon && <item.icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-brandPurple' : 'text-blush-dark'}`} />}
                  <span>{item.label}</span>
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-softPink-border text-nearBlack text-xs font-medium hover:bg-softPink-surface transition"
              title="Privacy Controls & Settings"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brandPurple" />
              <span>{t.nav.privacy}</span>
            </button>

            {/* Authentication Control: Login or User Pill */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-softPink-border/70">
                <div 
                  onClick={() => setCurrentTab('dashboard')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-softPink text-brandPurple text-xs font-semibold cursor-pointer hover:bg-softPink-hover transition shadow-2xs"
                  title={`Logged in as ${user?.name}`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-brandPurple" />
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-1.5 text-mutedText hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Sign out"
                  aria-label="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('login')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentTab === 'login'
                    ? 'bg-brandPurple text-white shadow-xs'
                    : 'bg-brandPurple text-white hover:bg-brandPurple-hover shadow-soft-purple'
                }`}
                title="Sign in to your account"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}
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

          {/* Mobile Login / User Profile */}
          <div className="pt-2 border-t border-softPink-border/60">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-softPink/60">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brandPurple" />
                  <span className="text-xs font-semibold text-nearBlack">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-red-600 font-medium py-1 px-2 rounded-md hover:bg-red-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setCurrentTab('login');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
                  currentTab === 'login'
                    ? 'bg-brandPurple text-white'
                    : 'bg-softPink text-brandPurple'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-softPink-border/60 flex items-center justify-between">
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
