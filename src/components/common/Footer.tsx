import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, HeartHandshake, AlertTriangle, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-nearBlack text-white border-t border-nearBlack-subtle pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Alert Bar */}
        <div className="bg-nearBlack-surface rounded-2xl p-4 sm:p-5 border border-white/10 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blush/20 text-blush shrink-0">
            <AlertTriangle className="w-5 h-5 text-blush" />
          </div>
          <div className="text-xs sm:text-sm text-softPink-light/90 leading-relaxed">
            <strong className="text-white font-semibold">Important Medical Boundary: </strong>
            {t.brand.nonDiagnosticDisclaimer} If you experience acute, severe pain, heavy unmanageable bleeding, or fever with pelvic symptoms, please seek emergency medical attention.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brandPurple flex items-center justify-center text-white">
                <HeartHandshake className="w-4 h-4 text-softPink" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                NAARI <span className="text-blush">AI</span>
              </span>
            </div>
            <p className="text-xs text-softPink font-medium">
              {t.brand.tagline}
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.brand.shortDesc}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-blush-light">
              <ShieldCheck className="w-3.5 h-3.5 text-blush" />
              <span>Private Guest Storage</span>
            </div>
          </div>

          {/* Core Modules Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-softPink mb-4 font-display">
              Care Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button 
                  onClick={() => setCurrentTab('cycle')}
                  className="hover:text-blush transition"
                >
                  {t.nav.cycleCare}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('pcos')}
                  className="hover:text-blush transition"
                >
                  {t.nav.pcosCare}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('ai')}
                  className="hover:text-blush transition"
                >
                  {t.nav.aiInterpreter}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('analytics')}
                  className="hover:text-blush transition"
                >
                  {t.nav.analytics}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('report')}
                  className="hover:text-blush transition"
                >
                  {t.nav.report}
                </button>
              </li>
            </ul>
          </div>

          {/* Reviewed Medical Foundations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-softPink mb-4 font-display">
              Clinical References
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="flex items-center gap-1.5">
                <span>WHO PCOS Fact Sheet (2023)</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </li>
              <li className="flex items-center gap-1.5">
                <span>ACOG Abnormal Uterine Bleeding</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </li>
              <li className="flex items-center gap-1.5">
                <span>Monash International PCOS Guideline</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </li>
              <li className="flex items-center gap-1.5">
                <span>Rotterdam Diagnostic Consensus</span>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-softPink mb-4 font-display">
              Emergency Services
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <p>For urgent clinical emergencies:</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p><span className="text-white font-semibold">India:</span> 112 (National) / 108 (Ambulance)</p>
                <p><span className="text-white font-semibold">US / Canada:</span> 911</p>
                <p><span className="text-white font-semibold">UK:</span> 999 / 111</p>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                CHAOS Hackathon Health Innovation Project. Built with medical care and privacy responsibility.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 NAARI AI. All rights reserved.</p>
          <p className="text-[11px] text-softPink/60">
            Dedicated strictly to Menstrual Cycle Care & PCOS Care.
          </p>
        </div>

      </div>
    </footer>
  );
};
