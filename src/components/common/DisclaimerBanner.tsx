import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-softPink border-b border-blush/40 px-4 py-2 sm:py-2.5 text-xs text-nearBlack relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-brandPurple shrink-0" />
          <span className="font-medium">
            <strong className="font-bold text-brandPurple">Non-Diagnostic Platform: </strong>
            {t.brand.nonDiagnosticDisclaimer}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md hover:bg-blush/30 transition text-nearBlack shrink-0"
          aria-label="Dismiss disclaimer banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
