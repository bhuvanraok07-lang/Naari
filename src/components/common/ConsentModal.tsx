import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ConsentModal: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasConsented = StorageService.getUserConsent();
    if (!hasConsented) {
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    StorageService.setUserConsent(true);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearBlack/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-softPink-border p-6 sm:p-8 space-y-6">
        
        {/* Brand Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brandPurple text-white flex items-center justify-center shadow-soft-purple">
            <HeartHandshake className="w-6 h-6 text-softPink" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-nearBlack font-display">
              Welcome to NAARI AI
            </h2>
            <p className="text-xs text-brandPurple font-semibold">
              Small Symptoms, Big Answers.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-nearBlack/80 leading-relaxed">
          Before you explore your health or record cycle entries, please review our core privacy and medical commitments:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0 mt-0.5" />
            <div>
              <strong className="text-nearBlack block">100% Private Guest Storage</strong>
              <span className="text-mutedText">Your health entries are stored securely in your private browser session. We do not sell or track your personal health data.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-brandPurple shrink-0 mt-0.5" />
            <div>
              <strong className="text-nearBlack block">Educational & Non-Diagnostic</strong>
              <span className="text-mutedText">NAARI AI provides health guidance and preparation for doctor consultations. It does not provide medical diagnoses or prescriptions.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0 mt-0.5" />
            <div>
              <strong className="text-nearBlack block">Evidence-Based Clinical Sources</strong>
              <span className="text-mutedText">All educational explanations cite reviewed standards from the WHO, ACOG, and the International PCOS Guideline.</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleAgree}
            className="w-full py-3.5 rounded-2xl purple-gradient-btn text-xs font-bold shadow-soft-purple"
          >
            I Understand & Agree — Continue to NAARI AI
          </button>
        </div>

      </div>
    </div>
  );
};
