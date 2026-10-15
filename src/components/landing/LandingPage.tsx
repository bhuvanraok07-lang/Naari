import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Calendar, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Activity, 
  MessageSquare,
  Lock,
  BookOpen
} from 'lucide-react';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 subtle-pink-gradient border-b border-softPink-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tagline / Innovation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-softPink border border-blush/60 text-nearBlack text-xs font-semibold shadow-xs animate-in fade-in duration-300">
              <Sparkles className="w-3.5 h-3.5 text-brandPurple" />
              <span>{t.brand.tagline}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brandPurple"></span>
              <span className="text-brandPurple font-bold">CHAOS Hackathon</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-nearBlack font-display leading-[1.15]">
              {t.brand.tagline.split(',')[0]},
              <span className="block text-brandPurple font-black">
                {t.brand.tagline.split(',')[1] || 'Big Answers.'}
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-nearBlack/80 font-normal leading-relaxed max-w-2xl mx-auto">
              {t.brand.subtagline}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => setCurrentTab('pcos')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl purple-gradient-btn font-semibold text-sm flex items-center justify-center gap-2 shadow-soft-purple"
              >
                <span>{t.landing.startAssessment}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('cycle')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border border-softPink-border text-nearBlack font-semibold text-sm hover:bg-softPink transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-brandPurple" />
                <span>{t.landing.exploreCare}</span>
              </button>
            </div>

            {/* Trust and Privacy Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs text-mutedText">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-softPink-border">
                <ShieldCheck className="w-3.5 h-3.5 text-brandPurple" />
                <span>{t.landing.safetyFirstBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-softPink-border">
                <Lock className="w-3.5 h-3.5 text-blush-dark" />
                <span>{t.landing.privacyBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-softPink-border">
                <BookOpen className="w-3.5 h-3.5 text-brandPurple" />
                <span>WHO & ACOG Evidence-based</span>
              </div>
            </div>

          </div>

        </div>

        {/* Decorative background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blush/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      </section>

      {/* Two Prominent Service Cards: Menstrual Cycle Care & PCOS Care */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            Two Specialized Pillars of Women's Health
          </h2>
          <p className="text-sm text-nearBlack/70">
            Dedicated entirely to menstrual health intelligence and clinical PCOS symptom exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A: Menstrual Cycle Care */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-softPink-border hover:border-blush shadow-premium transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-softPink flex items-center justify-center text-brandPurple group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">Module 01</span>
                <h3 className="text-2xl font-bold text-nearBlack font-display mt-1">
                  {t.landing.cycleCardTitle}
                </h3>
              </div>
              <p className="text-sm text-nearBlack/80 leading-relaxed">
                {t.landing.cycleCardDesc}
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs text-nearBlack/75">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Calculates actual cycle length between consecutive recorded period starts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Interactive period logging with flow categories & symptom tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Visual calendar and pattern intelligence without speculative predictions</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setCurrentTab('cycle')}
                className="w-full py-3.5 px-5 rounded-2xl bg-softPink hover:bg-softPink-border text-nearBlack font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <span>{t.landing.cycleCardAction}</span>
                <ArrowRight className="w-4 h-4 text-brandPurple" />
              </button>
            </div>
          </div>

          {/* Card B: PCOS Care */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-softPink-border hover:border-brandPurple/50 shadow-premium transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandPurple/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brandPurple/10 flex items-center justify-center text-brandPurple group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">Module 02</span>
                <h3 className="text-2xl font-bold text-nearBlack font-display mt-1">
                  {t.landing.pcosCardTitle}
                </h3>
              </div>
              <p className="text-sm text-nearBlack/80 leading-relaxed">
                {t.landing.pcosCardDesc}
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-nearBlack/75">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Guided clinical assessment based on WHO and Rotterdam consensus criteria</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Explores cycle regularity, skin changes, hirsutism, and duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>100% non-diagnostic: strictly prepares structured insights for your physician</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setCurrentTab('pcos')}
                className="w-full py-3.5 px-5 rounded-2xl purple-gradient-btn font-bold text-sm flex items-center justify-center gap-2 shadow-soft-purple"
              >
                <span>{t.landing.pcosCardAction}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* "How It Works" Section (4 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-softPink-surface rounded-3xl p-8 sm:p-12 border border-softPink-border">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
              Clear & Simple Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
              {t.landing.howItWorksTitle}
            </h2>
            <p className="text-sm text-nearBlack/70">
              {t.landing.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-softPink-border/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-softPink text-brandPurple flex items-center justify-center font-bold text-sm">
                  <MessageSquare className="w-5 h-5 text-brandPurple" />
                </div>
                <h4 className="text-base font-bold text-nearBlack font-display">
                  {t.landing.step1Title}
                </h4>
                <p className="text-xs text-nearBlack/70 leading-relaxed">
                  {t.landing.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-softPink-border/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-softPink text-brandPurple flex items-center justify-center font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-brandPurple" />
                </div>
                <h4 className="text-base font-bold text-nearBlack font-display">
                  {t.landing.step2Title}
                </h4>
                <p className="text-xs text-nearBlack/70 leading-relaxed">
                  {t.landing.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-softPink-border/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-softPink text-brandPurple flex items-center justify-center font-bold text-sm">
                  <Activity className="w-5 h-5 text-brandPurple" />
                </div>
                <h4 className="text-base font-bold text-nearBlack font-display">
                  {t.landing.step3Title}
                </h4>
                <p className="text-xs text-nearBlack/70 leading-relaxed">
                  {t.landing.step3Desc}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-softPink-border/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brandPurple text-white flex items-center justify-center font-bold text-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-nearBlack font-display">
                  {t.landing.step4Title}
                </h4>
                <p className="text-xs text-nearBlack/70 leading-relaxed">
                  {t.landing.step4Desc}
                </p>
              </div>
            </div>

          </div>

          {/* Quick jump to AI Symptom Interpreter */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-softPink-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brandPurple/10 flex items-center justify-center text-brandPurple shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-nearBlack">Don't know how to describe your symptoms medically?</h4>
                <p className="text-xs text-mutedText">Type in Kannada, Telugu, Hindi, or English. Our AI will translate and organize it safely.</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('ai')}
              className="px-5 py-2.5 rounded-xl bg-softPink hover:bg-softPink-border text-nearBlack font-semibold text-xs transition shrink-0"
            >
              Try Symptom Clarity AI →
            </button>
          </div>

        </div>
      </section>

      {/* Trust & Medical Responsibility Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-nearBlack text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/20 text-blush text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.landing.safetyFirstBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              {t.landing.trustTitle}
            </h2>
            <p className="text-sm text-softPink-light/80 leading-relaxed">
              {t.landing.trustDesc} We maintain strict non-diagnostic boundaries: NAARI AI never generates fake statistical risk percentages, never prescribes medications, and ensures any potentially urgent red flags are prominently flagged for emergency care.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-softPink">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blush" />
                <span>Zero Third-Party Advertising</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blush" />
                <span>Consented Private Guest Mode</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blush" />
                <span>Evidence-Based Doctor Question Guides</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 rounded-full bg-brandPurple/20 blur-3xl pointer-events-none"></div>
        </div>
      </section>

    </div>
  );
};
