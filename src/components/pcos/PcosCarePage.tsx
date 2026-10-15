import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { StorageService } from '../../services/storage';
import { PcosAssessmentData } from '../../types';
import { EDUCATIONAL_TOPICS } from '../../data/medicalKnowledge';
import { 
  HeartHandshake, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  X, 
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  Heart,
  Moon,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface PcosCarePageProps {
  setCurrentTab: (tab: string) => void;
}

export const PcosCarePage: React.FC<PcosCarePageProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);

  // Form State: 1. Menstrual History
  const [cycleRegularity, setCycleRegularity] = useState<PcosAssessmentData['cycleRegularity']>('irregular_infrequent');
  const [cycleIntervalEstimate, setCycleIntervalEstimate] = useState<string>('35-50 days');

  // Form State: 2. Skin & Hair
  const [acneChanges, setAcneChanges] = useState<PcosAssessmentData['acneChanges']>('moderate_severe');
  const [hairChanges, setHairChanges] = useState<PcosAssessmentData['hairChanges']>('noticeable_chin_chest_abdomen');
  const [scalpHairThinning, setScalpHairThinning] = useState<boolean>(false);

  // Form State: 3. Energy & Metabolic Health
  const [tirednessOrEnergy, setTirednessOrEnergy] = useState<PcosAssessmentData['tirednessOrEnergy']>('frequent_fatigue');
  const [sleepQualityOrSnoring, setSleepQualityOrSnoring] = useState<PcosAssessmentData['sleepQualityOrSnoring']>('good_sleep');
  const [metabolicHistory, setMetabolicHistory] = useState<PcosAssessmentData['metabolicHistory']>('none');

  // Form State: 4. Duration & Well-being
  const [durationMonths, setDurationMonths] = useState<PcosAssessmentData['durationMonths']>('6_to_12');
  const [priorMedicalEvaluation, setPriorMedicalEvaluation] = useState<PcosAssessmentData['priorMedicalEvaluation']>('none');
  const [dailyLifeImpact, setDailyLifeImpact] = useState<string[]>([
    'Self-confidence & body image',
    'Energy for daily tasks'
  ]);
  const [primaryConcernText, setPrimaryConcernText] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');

  // Confirmed symptoms user can review and edit
  const [confirmedSymptoms, setConfirmedSymptoms] = useState<string[]>([]);
  const [newSymptomInput, setNewSymptomInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const toggleDailyImpact = (item: string) => {
    if (dailyLifeImpact.includes(item)) {
      setDailyLifeImpact(dailyLifeImpact.filter(i => i !== item));
    } else {
      setDailyLifeImpact([...dailyLifeImpact, item]);
    }
  };

  const syncSymptomsFromAnswers = () => {
    const list: string[] = [];
    if (cycleRegularity === 'irregular_infrequent') list.push('Irregular or Infrequent Menstrual Cycles');
    if (cycleRegularity === 'absent_amenorrhea') list.push('Prolonged Absence of Menstrual Periods (Amenorrhea)');
    if (cycleRegularity === 'frequent_short') list.push('Unusually Short Cycle Intervals (<24 days)');
    
    if (acneChanges === 'mild') list.push('Mild Occasional Acne');
    if (acneChanges === 'moderate_severe') list.push('Moderate to Severe Persistent Acne');
    if (acneChanges === 'cystic_jawline') list.push('Deep Cystic Jawline / Chin Acne');

    if (hairChanges === 'mild_upper_lip') list.push('Mild Fine Hair on Upper Lip / Chin');
    if (hairChanges === 'noticeable_chin_chest_abdomen') list.push('Noticeable Coarser Hair on Chin, Chest or Abdomen');
    if (hairChanges === 'significant') list.push('Significant Facial / Body Hair (Hirsutism)');

    if (scalpHairThinning) list.push('Noticeable Scalp Hair Thinning / Widening Part');

    if (tirednessOrEnergy === 'frequent_fatigue' || tirednessOrEnergy === 'extreme_exhaustion') {
      list.push('Frequent Fatigue & Physical Exhaustion');
    }

    if (sleepQualityOrSnoring === 'snoring_waking_gasping') {
      list.push('Snoring / Sleep Disruption (Sleep Apnea Screening)');
    }

    if (metabolicHistory === 'insulin_resistance') {
      list.push('Clinician-identified Insulin Resistance');
    } else if (metabolicHistory === 'borderline_sugar') {
      list.push('Borderline Blood Glucose History');
    }

    if (list.length === 0) list.push('No obvious classic symptoms reported');
    setConfirmedSymptoms(list);
  };

  const handleNextStep = () => {
    if (step === 4) {
      syncSymptomsFromAnswers();
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptomInput.trim()) return;
    if (!confirmedSymptoms.includes(newSymptomInput.trim())) {
      setConfirmedSymptoms([...confirmedSymptoms, newSymptomInput.trim()]);
    }
    setNewSymptomInput('');
  };

  const handleRemoveSymptom = (symptom: string) => {
    setConfirmedSymptoms(confirmedSymptoms.filter(s => s !== symptom));
  };

  const handleCompleteAssessment = () => {
    const assessmentData: PcosAssessmentData = {
      id: `pcos_${Date.now()}`,
      cycleRegularity,
      acneChanges,
      hairChanges,
      scalpHairThinning,
      durationMonths,
      priorMedicalEvaluation,
      tirednessOrEnergy,
      sleepQualityOrSnoring,
      metabolicHistory,
      dailyLifeImpact,
      primaryConcernText: primaryConcernText.trim() || undefined,
      userDescription: userDescription.trim() || undefined,
      confirmedSymptoms,
      completedAt: new Date().toISOString(),
    };

    StorageService.savePcosAssessment(assessmentData);
    setIsSaved(true);
  };

  const totalSteps = 5;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-softPink-border space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
            Module 02 • PCOS Symptom Explorer
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold border border-blush/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-brandPurple" />
            <span>Non-Diagnostic Clinical Exploration</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
          PCOS Symptom Explorer
        </h1>
        <p className="text-xs sm:text-sm text-nearBlack/70 leading-relaxed max-w-2xl">
          A structured, compassionate exploration of menstrual regularity, androgen-related markers, metabolic indicators, and everyday well-being to prepare for a healthcare consultation.
        </p>
      </div>

      {/* Step Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-nearBlack">
          <span className={step >= 1 ? 'text-brandPurple' : 'text-mutedText'}>1. Cycle History</span>
          <span className={step >= 2 ? 'text-brandPurple' : 'text-mutedText'}>2. Skin & Hair</span>
          <span className={step >= 3 ? 'text-brandPurple' : 'text-mutedText'}>3. Metabolic</span>
          <span className={step >= 4 ? 'text-brandPurple' : 'text-mutedText'}>4. Well-being</span>
          <span className={step >= 5 ? 'text-brandPurple' : 'text-mutedText'}>5. Summary</span>
        </div>

        <div className="w-full bg-softPink-border h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brandPurple h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Assessment Body Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-softPink-border shadow-xs">
        
        {/* STEP 1: MENSTRUAL HISTORY */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">Step 1 of 5 • Menstrual History</span>
              <h3 className="text-lg font-bold text-nearBlack font-display">
                How would you describe your cycle pattern over the past 6–12 months?
              </h3>
              <p className="text-xs text-mutedText">
                Ovulatory irregularity is one of the three core Rotterdam diagnostic criteria reviewed under the 2023 International Evidence-based Guideline.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'regular', title: 'Regular (usually every 24–38 days)', hint: 'Predictable bleeding every month' },
                { key: 'irregular_infrequent', title: 'Irregular or Infrequent (cycles longer than 38 days, or skipping months)', hint: 'Oligomenorrhea: periods come unexpectedly or less than 8 times a year' },
                { key: 'absent_amenorrhea', title: 'Absent (no period for 3 or more consecutive months)', hint: 'Secondary amenorrhea: menstruation has stopped without pregnancy' },
                { key: 'frequent_short', title: 'Frequent (periods occur closer than every 24 days)', hint: 'Polymenorrhea: unusually short intervals' },
                { key: 'unsure', title: 'Unsure / Have not tracked consistently', hint: 'Difficulty recalling exact dates' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setCycleRegularity(opt.key as any)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-start justify-between gap-3 ${
                    cycleRegularity === opt.key
                      ? 'bg-softPink border-brandPurple text-nearBlack shadow-xs'
                      : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-nearBlack">{opt.title}</div>
                    <div className="text-[11px] text-mutedText mt-0.5">{opt.hint}</div>
                  </div>
                  {cycleRegularity === opt.key && (
                    <div className="w-5 h-5 rounded-full bg-brandPurple text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-nearBlack block">
                Approximate Typical Interval Between Periods (Optional):
              </label>
              <input
                type="text"
                value={cycleIntervalEstimate}
                onChange={(e) => setCycleIntervalEstimate(e.target.value)}
                placeholder="e.g. 40-50 days, or varies between 30 and 60 days"
                className="w-full px-3.5 py-2.5 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple"
              />
            </div>
          </div>
        )}

        {/* STEP 2: SKIN & HAIR */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">Step 2 of 5 • Skin & Hair Changes</span>
              <h3 className="text-lg font-bold text-nearBlack font-display">
                Signs Associated with Androgen Activity
              </h3>
              <p className="text-xs text-mutedText">
                Clinical hyperandrogenism can manifest as persistent acne, coarser facial or body hair (hirsutism), or scalp thinning.
              </p>
            </div>

            {/* Acne */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-nearBlack block">
                Acne or Oily Skin Characteristics:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'none', label: 'No persistent acne' },
                  { key: 'mild', label: 'Mild occasional breakouts' },
                  { key: 'moderate_severe', label: 'Moderate to severe persistent acne' },
                  { key: 'cystic_jawline', label: 'Deep, cystic acne around jawline & chin' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAcneChanges(opt.key as any)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between ${
                      acneChanges === opt.key
                        ? 'bg-softPink border-brandPurple text-nearBlack font-bold shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {acneChanges === opt.key && <Check className="w-4 h-4 text-brandPurple shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Facial / Body Hair */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-nearBlack block">
                Facial or Body Hair Growth (Hirsutism):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'none', label: 'No noticeable increase in facial/body hair' },
                  { key: 'mild_upper_lip', label: 'Mild fine hair on upper lip or chin' },
                  { key: 'noticeable_chin_chest_abdomen', label: 'Noticeable coarser hair on chin, chest, or abdomen' },
                  { key: 'significant', label: 'Significant coarser dark hair requiring frequent removal' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setHairChanges(opt.key as any)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between ${
                      hairChanges === opt.key
                        ? 'bg-softPink border-brandPurple text-nearBlack font-bold shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {hairChanges === opt.key && <Check className="w-4 h-4 text-brandPurple shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Scalp Thinning */}
            <div className="p-4 rounded-2xl border border-softPink-border bg-softPink-surface/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-nearBlack block">
                  Scalp Hair Thinning / Widening Central Part:
                </span>
                <span className="text-[11px] text-mutedText">
                  Noticeable shedding or reduction of hair volume at the crown.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setScalpHairThinning(!scalpHairThinning)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  scalpHairThinning ? 'bg-brandPurple' : 'bg-gray-300'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    scalpHairThinning ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ENERGY & METABOLIC HEALTH */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">Step 3 of 5 • Energy & Metabolic Health</span>
              <h3 className="text-lg font-bold text-nearBlack font-display">
                Energy, Sleep Quality & Metabolic Health
              </h3>
              <p className="text-xs text-mutedText">
                The 2023 International PCOS Guideline emphasizes screening for obstructive sleep apnea (snoring/daytime fatigue) and insulin resistance.
              </p>
            </div>

            {/* Tiredness / Energy */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-nearBlack block">
                Daytime Energy & Fatigue Levels:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'normal', label: 'Normal daytime energy' },
                  { key: 'frequent_fatigue', label: 'Frequent sluggishness / fatigue ("Kamzori")' },
                  { key: 'extreme_exhaustion', label: 'Persistent, debilitating exhaustion' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setTirednessOrEnergy(opt.key as any)}
                    className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                      tirednessOrEnergy === opt.key
                        ? 'bg-softPink border-brandPurple text-brandPurple shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep & Snoring */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-nearBlack block">
                Sleep Quality & Breathing During Sleep:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'good_sleep', label: 'Restful sleep, no snoring' },
                  { key: 'poor_sleep', label: 'Restless sleep / difficulty waking' },
                  { key: 'snoring_waking_gasping', label: 'Loud snoring / waking unrefreshed (Sleep Apnea Screening)' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSleepQualityOrSnoring(opt.key as any)}
                    className={`p-3 rounded-2xl border text-center text-xs font-semibold transition ${
                      sleepQualityOrSnoring === opt.key
                        ? 'bg-softPink border-brandPurple text-brandPurple shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prior Clinician Metabolic Findings */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-nearBlack block">
                Previous Clinician-Identified Metabolic Concerns (Optional):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'none', label: 'No known metabolic diagnoses' },
                  { key: 'insulin_resistance', label: 'Diagnosed insulin resistance / dark neck (Acanthosis)' },
                  { key: 'borderline_sugar', label: 'Pre-diabetes or borderline fasting glucose' },
                  { key: 'cholesterol_changes', label: 'Lipid / cholesterol changes' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setMetabolicHistory(opt.key as any)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between ${
                      metabolicHistory === opt.key
                        ? 'bg-softPink border-brandPurple text-nearBlack font-bold shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {metabolicHistory === opt.key && <Check className="w-4 h-4 text-brandPurple shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: WELL-BEING & DAILY IMPACT */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">Step 4 of 5 • Well-being & Daily Impact</span>
              <h3 className="text-lg font-bold text-nearBlack font-display">
                How Do These Symptoms Affect Your Daily Life?
              </h3>
              <p className="text-xs text-mutedText">
                Understanding impact helps your doctor prioritize what matters most to your quality of life.
              </p>
            </div>

            {/* Impact Checkboxes */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-nearBlack block">
                Select Any Areas Impacted:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Studying / Focus at school or college',
                  'Work productivity & physical presence',
                  'Sleep quality & restfulness',
                  'Self-confidence & emotional comfort ("Heart feels heavy")',
                  'Daily physical energy & movement',
                  'Social comfort with friends & family'
                ].map(item => {
                  const isChecked = dailyLifeImpact.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleDailyImpact(item)}
                      className={`p-3 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-softPink border-blush text-nearBlack font-semibold'
                          : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                      }`}
                    >
                      <span>{item}</span>
                      {isChecked && <Check className="w-4 h-4 text-brandPurple shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration of Symptoms */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-nearBlack block">
                How long have you noticed these symptoms?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'less_than_3', label: '< 3 months' },
                  { key: '3_to_6', label: '3 to 6 months' },
                  { key: '6_to_12', label: '6 to 12 months' },
                  { key: 'more_than_12', label: '> 1 year' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setDurationMonths(opt.key as any)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                      durationMonths === opt.key
                        ? 'bg-softPink border-brandPurple text-brandPurple shadow-xs'
                        : 'border-softPink-border hover:bg-softPink-surface text-nearBlack'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Question for Doctor */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-nearBlack block">
                What is your main question or biggest concern for the doctor?
              </label>
              <textarea
                rows={2}
                value={primaryConcernText}
                onChange={(e) => setPrimaryConcernText(e.target.value)}
                placeholder="e.g., I want to know why my periods are skipping and how to manage my acne without harsh treatments..."
                className="w-full px-4 py-2.5 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 5: YOUR SYMPTOM SUMMARY (Non-Diagnostic Report) */}
        {step === 5 && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">Step 5 of 5 • Consultation Summary</span>
              <h3 className="text-xl font-bold text-nearBlack font-display">
                Your Symptom Summary
              </h3>
              <p className="text-xs text-mutedText">
                A non-diagnostic summary of observed patterns to help you prepare for an informed conversation with your physician.
              </p>
            </div>

            {/* Confirmed Symptoms Chips */}
            <div className="space-y-3 p-5 rounded-2xl bg-softPink-surface border border-softPink-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nearBlack">
                  Symptoms Reported by You (Review & Correct):
                </span>
                <span className="text-[11px] text-mutedText">Click 'X' to remove any</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {confirmedSymptoms.map((symp) => (
                  <span
                    key={symp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blush text-nearBlack text-xs font-semibold shadow-2xs"
                  >
                    <span>{symp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSymptom(symp)}
                      className="p-0.5 rounded-full hover:bg-softPink transition text-nearBlack"
                      title="Remove symptom"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Custom Symptom Input */}
              <form onSubmit={handleAddSymptom} className="flex gap-2 pt-1 max-w-md">
                <input
                  type="text"
                  value={newSymptomInput}
                  onChange={(e) => setNewSymptomInput(e.target.value)}
                  placeholder="Add another symptom you noticed..."
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

            {/* Educational Pattern Insights */}
            <div className="p-5 rounded-2xl bg-white border border-softPink-border space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-brandPurple">
                <Sparkles className="w-4 h-4" />
                <span>What These Patterns May Be Associated With (Educational)</span>
              </div>
              <p className="text-nearBlack/85 leading-relaxed">
                {EDUCATIONAL_TOPICS.pcosBasics.summary} Under the 2023 International Evidence-based Guideline, meeting at least two of the three Rotterdam features (ovulatory irregularity, hyperandrogenism signs, and polycystic ovarian morphology on ultrasound) is the clinical standard for diagnosis, provided alternative explanations are ruled out.
              </p>

              <div className="p-3 rounded-xl bg-softPink-surface border border-softPink-border space-y-1">
                <strong className="text-nearBlack block">Other Explanations to Discuss:</strong>
                <p className="text-nearBlack/80">
                  {EDUCATIONAL_TOPICS.pcosBasics.differentialNotice}
                </p>
              </div>
            </div>

            {/* What to Track Next & Questions to Ask */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2">
                <span className="font-bold text-brandPurple block uppercase tracking-wider text-[11px]">
                  What to Track Next:
                </span>
                <ul className="space-y-1 text-nearBlack list-disc pl-4">
                  {EDUCATIONAL_TOPICS.suggestedTrackingItems.slice(0, 4).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2">
                <span className="font-bold text-brandPurple block uppercase tracking-wider text-[11px]">
                  Questions for Your Doctor:
                </span>
                <ul className="space-y-1 text-nearBlack list-disc pl-4">
                  <li>"Could my cycle irregularity and skin/hair changes be related to PCOS or thyroid function?"</li>
                  <li>"Would you recommend hormone blood panels (FSH, LH, Testosterone, TSH)?"</li>
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            {isSaved ? (
              <div className="p-5 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-green-900">
                  Symptom Summary Successfully Saved!
                </h4>
                <p className="text-xs text-green-700">
                  Your responses are organized and ready to be compiled into your confidential Doctor-Visit Brief.
                </p>
                <button
                  onClick={() => setCurrentTab('report')}
                  className="px-6 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold shadow-soft-purple"
                >
                  Generate Doctor-Visit Brief
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCompleteAssessment}
                  className="w-full py-3.5 px-6 rounded-2xl purple-gradient-btn text-xs font-extrabold flex items-center justify-center gap-2 shadow-soft-purple"
                >
                  <FileText className="w-4 h-4" />
                  <span>Save Summary & Generate Doctor-Visit Brief</span>
                </button>
              </div>
            )}

          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-softPink-border/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl border border-softPink-border hover:bg-softPink text-nearBlack text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps && (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold flex items-center gap-2 shadow-soft-purple"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
