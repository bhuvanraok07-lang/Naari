import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import { StorageService } from '../../services/storage';
import { 
  ShieldCheck, 
  Trash2, 
  Download, 
  Database, 
  Check, 
  X, 
  AlertCircle 
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onDataChanged }) => {
  const { language, setLanguage, t } = useLanguage();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const handleClearData = () => {
    StorageService.clearAllData();
    setConfirmDelete(false);
    setMessage('All local health logs and assessment reports have been securely erased.');
    onDataChanged();
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSeedDemoData = () => {
    StorageService.seedSampleCycleData();
    setMessage('Sample clinical cycle entries successfully loaded. Check Cycle Care or Analytics.');
    onDataChanged();
    setTimeout(() => setMessage(null), 4000);
  };

  const handleExportJson = () => {
    const data = {
      cycleEntries: StorageService.getCycleEntries(),
      pcosAssessments: StorageService.getPcosAssessments(),
      healthReports: StorageService.getHealthReports(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `naari-ai-health-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearBlack/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-softPink-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-softPink-light to-white border-b border-softPink-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brandPurple/10 text-brandPurple">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-nearBlack font-display">
                {t.settings.title}
              </h3>
              <p className="text-xs text-mutedText">
                {t.settings.guestModeBadge}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-nearBlack hover:bg-softPink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {message && (
            <div className="p-3.5 rounded-xl bg-softPink border border-blush text-nearBlack text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-brandPurple shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-mutedText block">
              {t.settings.languageHeading}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                    language === l.code
                      ? 'border-brandPurple bg-softPink-light shadow-xs'
                      : 'border-softPink-border hover:bg-softPink-surface'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-nearBlack">{l.native}</div>
                    <div className="text-[11px] text-mutedText">{l.label}</div>
                  </div>
                  {language === l.code && <Check className="w-4 h-4 text-brandPurple" />}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Architecture Info */}
          <div className="p-4 rounded-2xl bg-softPink-surface border border-softPink-border space-y-2">
            <div className="flex items-center gap-2 text-brandPurple text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.settings.privacyHeading}</span>
            </div>
            <p className="text-xs text-nearBlack/80 leading-relaxed">
              {t.settings.privacyDesc}
            </p>
          </div>

          {/* Data Controls */}
          <div className="space-y-3 pt-2 border-t border-softPink-border/60">
            <label className="text-xs font-bold uppercase tracking-wider text-mutedText block">
              Manage Stored Records
            </label>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleExportJson}
                className="flex-1 py-2.5 px-3 rounded-xl border border-softPink-border bg-white hover:bg-softPink-light text-xs font-semibold text-nearBlack flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-brandPurple" />
                <span>Export My Data (JSON)</span>
              </button>

              <button
                onClick={handleSeedDemoData}
                className="flex-1 py-2.5 px-3 rounded-xl border border-blush/50 bg-softPink-light hover:bg-softPink text-xs font-semibold text-brandPurple flex items-center justify-center gap-2 transition"
              >
                <Database className="w-4 h-4 text-blush-dark" />
                <span>Load Demo Cycle Data</span>
              </button>
            </div>

            {/* Clear Data Section */}
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full py-2.5 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 flex items-center justify-center gap-2 transition mt-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.settings.clearDataBtn}</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-3 mt-2">
                <div className="flex items-start gap-2 text-red-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t.settings.clearDataConfirm}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearData}
                    className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition"
                  >
                    Yes, Erase Everything
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-softPink-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brandPurple text-white text-xs font-semibold hover:bg-brandPurple-hover transition shadow-xs"
          >
            {t.settings.close}
          </button>
        </div>

      </div>
    </div>
  );
};
