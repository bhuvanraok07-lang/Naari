import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ApiService } from '../../services/api';
import { StorageService } from '../../services/storage';
import { SymptomClarityResult, Language } from '../../types';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  X, 
  ShieldAlert, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  Clock,
  Heart,
  Droplets,
  Info,
  Check,
  FileText
} from 'lucide-react';

interface AiInterpreterPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AiInterpreterPage: React.FC<AiInterpreterPageProps> = ({ setCurrentTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomClarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newSymptomText, setNewSymptomText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sample everyday language prompts across English, Kannada, Telugu, Hindi + cultural phrases
  const samplePrompts: { lang: Language; text: string; label: string }[] = [
    { 
      lang: 'en', 
      text: 'My period has not come for a long time, I have noticed more facial hair and irregular periods.', 
      label: 'EN: Long absence & facial hair' 
    },
    { 
      lang: 'kn', 
      text: 'ನನಗೆ ತುಂಬಾ ಸುಸ್ತಾಗುತ್ತದೆ ಮತ್ತು ಮುಟ್ಟು ಸರಿಯಾಗಿ ಬರುತ್ತಿಲ್ಲ, ಮನಸ್ಸು ಭಾರವಾಗಿದೆ.', 
      label: 'KN: ಸುಸ್ತು & ಮುಟ್ಟು ವಿಳಂಬ (ಮನಸ್ಸು ಭಾರ)' 
    },
    { 
      lang: 'te', 
      text: 'నా పీరియడ్స్ సరిగ్గా రావడం లేదు, బాగా నీరసంగా ఉంది మరియు తెల్ల బట్ట కనిపిస్తోంది.', 
      label: 'TE: ఆలస్య ఋతుచక్రం (తెల్ల బట్ట)' 
    },
    { 
      lang: 'hi', 
      text: 'मुझे बहुत कमजोरी महसूस होती है, पीरियड 3 महीने से नहीं आया और सफेद पानी की समस्या है।', 
      label: 'HI: कमजोरी, सफेद पानी व पीरियड देरी' 
    },
    { 
      lang: 'en', 
      text: 'I get severe cramps every month, feel weak and tired most days, and my body feels hot.', 
      label: 'EN: Severe cramps & Kamzori' 
    },
    { 
      lang: 'en', 
      text: 'I am soaking through two pads an hour with sudden excruciating pelvic pain and dizziness.', 
      label: '⚠️ Emergency Test (Safety Engine)' 
    },
  ];

  const handleAnalyze = async (textToAnalyze?: string, langToUse?: Language) => {
    const text = textToAnalyze || inputText;
    const targetLang = langToUse || language;
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const data = await ApiService.interpretSymptoms(text, targetLang);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to interpret symptoms. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptomText.trim() || !result) return;
    if (!result.reportedSymptoms.includes(newSymptomText.trim())) {
      setResult({
        ...result,
        reportedSymptoms: [...result.reportedSymptoms, newSymptomText.trim()]
      });
    }
    setNewSymptomText('');
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    if (!result) return;
    setResult({
      ...result,
      reportedSymptoms: result.reportedSymptoms.filter(s => s !== symptomToRemove)
    });
  };

  const handleSaveToConsultationBrief = () => {
    if (!result) return;
    // Save to storage
    const existing = StorageService.getPcosAssessments();
    const newAssessment = {
      id: `clarity_${Date.now()}`,
      cycleRegularity: 'irregular_infrequent' as const,
      acneChanges: 'mild' as const,
      hairChanges: 'none' as const,
      scalpHairThinning: false,
      durationMonths: '3_to_6' as const,
      priorMedicalEvaluation: 'none' as const,
      tirednessOrEnergy: 'frequent_fatigue' as const,
      sleepQualityOrSnoring: 'good_sleep' as const,
      metabolicHistory: 'none' as const,
      dailyLifeImpact: ['Daily energy', 'Cycle predictability'],
      primaryConcernText: result.plainLanguageRestatement,
      userDescription: result.originalText,
      confirmedSymptoms: result.reportedSymptoms,
      completedAt: new Date().toISOString(),
    };
    StorageService.savePcosAssessment(newAssessment);
    setSaveSuccess(true);
    setTimeout(() => {
      setCurrentTab('report');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-softPink-border space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
            Everyday Language-to-Health-Clarity Engine
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold border border-blush/40 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brandPurple" />
            <span>Symptom Clarity AI</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
          Symptom Clarity AI
        </h1>
        <p className="text-xs sm:text-sm text-nearBlack/70 leading-relaxed max-w-2xl">
          Describe how you feel in your everyday words. NAARI AI transforms colloquial and everyday language into compassionate, structured clarity for your doctor—without diagnostic labeling.
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-softPink-border shadow-xs space-y-4">
        
        {/* Sample chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mutedText block">
              Try Everyday Language & Cultural Expressions:
            </span>
            <span className="text-[10px] text-mutedText">Select any prompt below:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(p.text);
                  setLanguage(p.lang);
                  handleAnalyze(p.text, p.lang);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                  p.label.includes('Emergency')
                    ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100 font-semibold'
                    : 'bg-softPink-surface border-softPink-border hover:bg-softPink hover:border-blush text-nearBlack'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your symptoms in everyday words (e.g. 'My period has not come for a long time', 'Kamzori and safed pani', 'ನನಗೆ ತುಂಬಾ ಸುಸ್ತಾಗುತ್ತದೆ')..."
            className="w-full px-4 py-3.5 rounded-2xl border border-softPink-border text-sm focus:outline-hidden focus:border-brandPurple resize-none bg-softPink-surface/20"
          ></textarea>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="text-xs text-mutedText flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0" />
            <span>Preserves your exact words • Pre-screened with Clinician Safety Rules</span>
          </div>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl purple-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-soft-purple disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Translating to Health Clarity...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Clarify Symptoms</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Structured Result Display */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* URGENT CLINICIAN SAFETY BANNER (Emergency Priority Override) */}
          {result.safetyAlert.isUrgent && (
            <div className="rounded-3xl p-6 sm:p-7 bg-red-50 border-2 border-red-500 text-red-950 space-y-4 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-red-600 text-white shrink-0 shadow-xs">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-200 text-red-900 text-[10px] font-extrabold uppercase tracking-wider">
                    Immediate Clinical Evaluation Required
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-red-900 font-display">
                    {result.safetyAlert.flaggedSymptoms[0] || 'Potentially Urgent Medical Symptom Detected'}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-800 leading-relaxed font-medium">
                    {result.safetyAlert.urgentReason}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-red-200 text-xs space-y-2">
                <strong className="text-red-900 block font-bold text-sm">Action Recommended by Safety Rules:</strong>
                <p className="text-red-800 font-semibold">{result.safetyAlert.immediateAction}</p>
                {result.safetyAlert.helplineNotice && (
                  <p className="text-[11px] text-red-700 pt-1 font-bold">{result.safetyAlert.helplineNotice}</p>
                )}
              </div>

              <p className="text-[11px] text-red-700/80 italic">
                * Note: Standard exploration is halted to prioritize your clinical safety. AI cannot downgrade this advisory.
              </p>
            </div>
          )}

          {/* MAIN SYMPTOM CLARITY CARD (When not emergency or shown alongside prompt guidance) */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-softPink-border shadow-xs space-y-6">
            
            {/* Top Bar: Category & Preserved User Text */}
            <div className="pb-5 border-b border-softPink-border space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brandPurple" />
                  <h3 className="text-lg font-bold text-nearBlack font-display">
                    Your Symptom Summary
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-mutedText">Focus:</span>
                  <span className="px-3 py-1 rounded-full bg-softPink text-nearBlack text-xs font-bold capitalize border border-blush/40">
                    {result.careCategory.replace('_', ' ')}
                  </span>
                  {result.duration && (
                    <span className="px-3 py-1 rounded-full bg-brandPurple/10 text-brandPurple text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{result.duration}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Preserved Original Wording */}
              <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-mutedText block mb-0.5">
                  Your Original Words:
                </span>
                <p className="text-nearBlack italic font-medium">"{result.originalText}"</p>
              </div>

              {/* Plain Language Restatement */}
              <div className="p-4 rounded-2xl bg-white border border-brandPurple/30 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brandPurple block">
                  Plain-Language Restatement:
                </span>
                <p className="text-nearBlack font-semibold leading-relaxed">
                  {result.plainLanguageRestatement}
                </p>
              </div>
            </div>

            {/* Cultural Expressions / Reviewed Glossary Term Card if matched */}
            {result.culturalPhrasesIdentified && result.culturalPhrasesIdentified.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl bg-purple-50/50 border border-brandPurple/20">
                <div className="flex items-center gap-2 text-brandPurple text-xs font-bold">
                  <Info className="w-4 h-4" />
                  <span>Cultural & Everyday Expression Understanding</span>
                </div>
                {result.culturalPhrasesIdentified.map((term, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-brandPurple/20 text-xs space-y-1">
                    <div className="font-bold text-nearBlack flex justify-between">
                      <span>{term.phrase}</span>
                      <span className="text-[10px] text-mutedText">{term.language}</span>
                    </div>
                    <p className="text-nearBlack/80 text-[11px] leading-relaxed">
                      <strong>Everyday meaning: </strong>{term.literalMeaning}
                    </p>
                    <p className="text-brandPurple text-[11px] leading-relaxed">
                      <strong>Clinical Context: </strong>{term.clinicalClarification}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Vaginal Discharge Specific Guidance */}
            {result.dischargeClarification && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Important Guidance Regarding Vaginal Discharge</span>
                </div>
                <p className="text-blue-950 leading-relaxed text-[11px]">
                  {result.dischargeClarification}
                </p>
              </div>
            )}

            {/* Emotional Support Compassion Notice */}
            {result.emotionalSupportNotice && (
              <div className="p-4 rounded-2xl bg-softPink-light border border-blush text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-nearBlack">
                  <Heart className="w-4 h-4 text-brandPurple fill-brandPurple/20" />
                  <span>Compassionate Health Context</span>
                </div>
                <p className="text-nearBlack/85 leading-relaxed text-[11px]">
                  {result.emotionalSupportNotice}
                </p>
              </div>
            )}

            {/* Extracted Symptoms with User Review / Correction */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-nearBlack block">
                  Identified Symptoms (Click 'X' to remove, or add missing ones):
                </label>
                <span className="text-[11px] text-mutedText">
                  User Verification & Correction
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.reportedSymptoms.map((symp) => (
                  <span
                    key={symp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-softPink border border-blush text-nearBlack text-xs font-semibold"
                  >
                    <span>{symp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSymptom(symp)}
                      className="p-0.5 rounded-full hover:bg-blush transition text-nearBlack"
                      title="Remove symptom"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Symptom Bar */}
              <form onSubmit={handleAddSymptom} className="flex gap-2 pt-1 max-w-md">
                <input
                  type="text"
                  value={newSymptomText}
                  onChange={(e) => setNewSymptomText(e.target.value)}
                  placeholder="Add any other symptom you felt (e.g., lower back ache)..."
                  className="flex-1 px-3 py-2 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-softPink hover:bg-softPink-border text-nearBlack text-xs font-bold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5 text-brandPurple" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Educational Explanation */}
            <div className="p-5 rounded-2xl bg-softPink-surface border border-softPink-border space-y-2">
              <div className="flex items-center gap-2 text-brandPurple text-xs font-bold">
                <BookOpen className="w-4 h-4" />
                <span>Reviewed Educational Guidance</span>
              </div>
              <p className="text-xs text-nearBlack/85 leading-relaxed">
                {result.educationalExplanation}
              </p>
            </div>

            {/* Suggested Tracking Information */}
            {result.suggestedTracking && result.suggestedTracking.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2 text-xs">
                <span className="text-mutedText block font-bold text-[11px] uppercase tracking-wider">
                  Recommended Items to Track Over the Next 2–3 Months:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-nearBlack">
                  {result.suggestedTracking.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brandPurple shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Info / Follow-up Questions */}
            {result.missingInformation.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>Details That Would Help Your Doctor:</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-800 list-disc pl-4">
                  {result.missingInformation.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medical Sources Cited */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText block">
                Reviewed Traceable Clinical References
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.medicalSources.map((source) => (
                  <div key={source.id} className="p-3.5 rounded-2xl border border-softPink-border bg-white text-xs space-y-1">
                    <div className="font-bold text-nearBlack flex items-center justify-between">
                      <span>{source.name}</span>
                      {source.url && (
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brandPurple hover:text-brandPurple-hover">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-brandPurple font-medium">{source.organization} • {source.publicationYear}</div>
                    <p className="text-[11px] text-mutedText line-clamp-2">{source.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step & Direct Action Buttons */}
            <div className="pt-4 border-t border-softPink-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-nearBlack font-medium">
                <strong className="text-brandPurple font-bold">Care Navigation: </strong>
                {result.recommendedNextStep}
              </div>

              <div className="flex flex-wrap gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveToConsultationBrief}
                  className="px-5 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold flex items-center gap-2 shadow-soft-purple"
                >
                  <FileText className="w-4 h-4" />
                  <span>{saveSuccess ? 'Saved! Loading Brief...' : 'Add to Doctor-Visit Brief'}</span>
                </button>

                {result.careCategory === 'pcos' || result.careCategory === 'combined' ? (
                  <button
                    onClick={() => setCurrentTab('pcos')}
                    className="px-4 py-2.5 rounded-xl border border-softPink-border hover:bg-softPink text-nearBlack text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Open PCOS Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brandPurple" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentTab('cycle')}
                    className="px-4 py-2.5 rounded-xl border border-softPink-border hover:bg-softPink text-nearBlack text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Open Cycle Care</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brandPurple" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
