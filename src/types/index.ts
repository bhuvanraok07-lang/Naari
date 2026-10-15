export type Language = 'en' | 'kn' | 'te' | 'hi';

export type FlowCategory = 'light' | 'moderate' | 'heavy';

export type LifeStage = 'adolescent' | 'young_adult' | 'adult' | 'perimenopause' | 'unspecified';

export interface CycleEntry {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  durationDays: number;
  flowCategory: FlowCategory;
  symptoms: string[];
  notes?: string;
  cycleLengthFromPrevious?: number | null; // calculated from previous period start date
  createdAt: string;
}

export interface UserCycleProfile {
  lifeStage: LifeStage;
  yearsSinceMenarche?: number | null;
  typicalIntervalDays?: number | null;
}

export interface CulturalGlossaryTerm {
  phrase: string;
  language: string;
  literalMeaning: string;
  clinicalClarification: string;
  importantBoundaries: string;
}

export interface PcosAssessmentData {
  id: string;
  cycleRegularity: 'regular' | 'irregular_infrequent' | 'absent_amenorrhea' | 'frequent_short' | 'unsure';
  cycleLengthDays?: number;
  acneChanges: 'none' | 'mild' | 'moderate_severe' | 'cystic_jawline';
  hairChanges: 'none' | 'mild_upper_lip' | 'noticeable_chin_chest_abdomen' | 'significant';
  scalpHairThinning: boolean;
  durationMonths: 'less_than_3' | '3_to_6' | '6_to_12' | 'more_than_12';
  priorMedicalEvaluation: 'none' | 'suspected_pcos' | 'diagnosed_pcos' | 'ultrasound_done' | 'other';
  // Upgraded energy & metabolic health
  tirednessOrEnergy: 'normal' | 'frequent_fatigue' | 'extreme_exhaustion';
  sleepQualityOrSnoring: 'good_sleep' | 'poor_sleep' | 'snoring_waking_gasping';
  metabolicHistory: 'none' | 'insulin_resistance' | 'borderline_sugar' | 'cholesterol_changes' | 'other';
  // Upgraded well-being & daily impact
  dailyLifeImpact: string[]; // e.g. ['Studying / Work focus', 'Sleep disruption', 'Self-confidence', 'Physical activities']
  primaryConcernText?: string;
  userDescription?: string;
  confirmedSymptoms: string[];
  completedAt: string;
}

export interface MedicalSource {
  id: string;
  name: string;
  organization: string;
  publicationYear: string;
  guidelineTitle: string;
  summary: string;
  url?: string;
  lastReviewed: string;
  supportedContent?: string;
}

export interface SafetyAlert {
  isUrgent: boolean;
  escalationLevel: 'none' | 'routine_consultation' | 'prompt_evaluation' | 'immediate_emergency';
  severity: 'none' | 'moderate_advisory' | 'urgent_clinical';
  flaggedSymptoms: string[];
  urgentReason?: string;
  immediateAction: string;
  helplineNotice?: string;
}

export interface SymptomClarityResult {
  careCategory: 'menstrual_cycle' | 'pcos' | 'combined' | 'general_urgent';
  originalText: string;
  language: Language;
  plainLanguageRestatement: string;
  reportedSymptoms: string[];
  culturalPhrasesIdentified: CulturalGlossaryTerm[];
  dischargeClarification?: string | null;
  emotionalSupportNotice?: string | null;
  duration?: string | null;
  missingInformation: string[];
  suggestedTracking: string[];
  educationalExplanation: string;
  recommendedNextStep: string;
  confidenceLevel: 'high' | 'moderate' | 'clarification_needed';
  uncertaintyNotice?: string | null;
  medicalSources: MedicalSource[];
  safetyAlert: SafetyAlert;
}

// Retain alias for backwards compatibility
export type AiInterpretation = SymptomClarityResult;

// Doctor-Visit Brief (Personalized Consultation Brief)
export interface DoctorVisitBrief {
  reportId: string; // e.g. NAARI-2026-A8F2K
  generatedAt: string;
  category: 'menstrual_cycle' | 'pcos' | 'combined';
  language: Language;
  
  // Section 1 — Main Concerns
  mainConcerns: {
    primaryStatedConcern: string;
    reasonForConsultation: string;
    prioritySymptomsToDiscuss: string[];
    userNotes?: string;
  };

  // Section 2 — Symptom Timeline & Cycle Patterns
  symptomTimeline: {
    reportedOnsetOrDuration: string;
    totalCyclesRecorded: number;
    averageCycleLengthDays: number | null;
    averagePeriodDurationDays: number | null;
    observedCycleIntervals: { startDate: string; durationDays: number; cycleLength: number | null; flow: string }[];
    dailyLifeImpact: string[];
    limitationsNotice: string;
  };

  // Section 3 — Symptom Clarity
  symptomClarity: {
    originalUserWords: string;
    plainLanguageRestatement: string;
    confirmedSymptoms: string[];
    educationalContext: string;
    differentialConsiderations: string[];
    sourcesCited: MedicalSource[];
  };

  // Section 4 — Questions for the Clinician
  questionsForClinician: {
    personalizedQuestions: string[];
    suggestedTopicsToExplore: string[];
  };

  // Section 5 — Important Information & Disclaimers
  importantInformation: {
    safetyNotice?: string | null;
    missingInformationNotes: string[];
    disclaimer: string;
  };
}

// Backwards compatibility alias
export type HealthAssessmentReport = DoctorVisitBrief;
