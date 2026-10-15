export interface AppTranslation {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    shortDesc: string;
    nonDiagnosticDisclaimer: string;
  };
  nav: {
    home: string;
    dashboard: string;
    cycleCare: string;
    pcosCare: string;
    aiInterpreter: string;
    analytics: string;
    report: string;
    language: string;
    privacy: string;
    guestMode: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    startAssessment: string;
    exploreCare: string;
    cycleCardTitle: string;
    cycleCardDesc: string;
    cycleCardAction: string;
    pcosCardTitle: string;
    pcosCardDesc: string;
    pcosCardAction: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    trustTitle: string;
    trustDesc: string;
    safetyFirstBadge: string;
    privacyBadge: string;
  };
  cycle: {
    title: string;
    subtitle: string;
    logPeriod: string;
    editPeriod: string;
    startDate: string;
    endDate: string;
    flow: string;
    flowLight: string;
    flowModerate: string;
    flowHeavy: string;
    symptomsTitle: string;
    symptomCramps: string;
    symptomBloating: string;
    symptomHeadache: string;
    symptomMoodSwings: string;
    symptomFatigue: string;
    symptomBackPain: string;
    symptomBreastTenderness: string;
    symptomAcne: string;
    notesPlaceholder: string;
    saveEntry: string;
    cancel: string;
    deleteEntry: string;
    historyTitle: string;
    emptyHistory: string;
    emptyHistoryDesc: string;
    cycleLengthLabel: string;
    durationLabel: string;
    daysUnit: string;
    cycleCalcNote: string;
    calendarTitle: string;
    calendarLegendPeriod: string;
    calendarLegendEstimated: string;
  };
  pcos: {
    title: string;
    subtitle: string;
    badgeNonDiagnostic: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
    cycleRegularityQuestion: string;
    regular: string;
    irregularInfrequent: string;
    absentAmenorrhea: string;
    frequentShort: string;
    unsure: string;
    skinChangesQuestion: string;
    skinNone: string;
    skinMild: string;
    skinModerateSevere: string;
    skinCysticJawline: string;
    hairChangesQuestion: string;
    hairNone: string;
    hairMildUpperLip: string;
    hairNoticeableChinChest: string;
    hairSignificant: string;
    scalpThinningQuestion: string;
    durationQuestion: string;
    lessThan3Months: string;
    threeToSixMonths: string;
    sixToTwelveMonths: string;
    moreThan12Months: string;
    priorEvaluationQuestion: string;
    priorNone: string;
    priorSuspected: string;
    priorDiagnosed: string;
    priorUltrasound: string;
    freeTextPrompt: string;
    freeTextPlaceholder: string;
    reviewTitle: string;
    reviewSubtitle: string;
    generateReportAction: string;
  };
  ai: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    analyzeBtn: string;
    analyzing: string;
    selectLanguagePrompt: string;
    interpretationTitle: string;
    extractedSymptoms: string[];
    careCategoryIdentified: string;
    missingInfoPrompt: string;
    userReviewNotice: string;
    addSymptomPlaceholder: string;
    addBtn: string;
    removeBtn: string;
    urgentWarningTitle: string;
    verifiedSourcesTitle: string;
    viewGuidanceAction: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    avgCycleLength: string;
    avgPeriodDuration: string;
    recordedCycles: string;
    cycleLengthTrend: string;
    periodDurationTrend: string;
    symptomFrequency: string;
    realDataNote: string;
    insufficientDataNotice: string;
  };
  report: {
    title: string;
    tagline: string;
    badge: string;
    referenceId: string;
    generatedOn: string;
    coverSection: string;
    userReportedSection: string;
    cycleHistorySection: string;
    symptomInterpretationSection: string;
    careGuidanceSection: string;
    importantInfoSection: string;
    primaryConcern: string;
    reportedSymptoms: string;
    cycleLengthStat: string;
    periodDurationStat: string;
    nextStepsTitle: string;
    questionsForDoctorTitle: string;
    sourcesTitle: string;
    downloadPdf: string;
    printReport: string;
    backToDashboard: string;
  };
  settings: {
    title: string;
    languageHeading: string;
    privacyHeading: string;
    privacyDesc: string;
    guestModeBadge: string;
    clearDataBtn: string;
    clearDataConfirm: string;
    close: string;
  };
  common: {
    yes: string;
    no: string;
    save: string;
    cancel: string;
    delete: string;
    next: string;
    back: string;
    done: string;
    required: string;
    optional: string;
    loading: string;
    error: string;
    retry: string;
  };
}

export const translations: Record<'en' | 'kn' | 'te' | 'hi', AppTranslation> = {
  en: {
    brand: {
      name: 'NAARI AI',
      tagline: 'Small Symptoms, Big Answers.',
      subtagline: 'Understand your cycle. Explore your symptoms. Take your next step with confidence.',
      shortDesc: 'A safe, educational, multilingual healthcare companion for Menstrual Cycle & PCOS Care.',
      nonDiagnosticDisclaimer: 'NAARI AI provides educational health information and symptom guidance. It does not diagnose medical conditions or replace professional medical care.',
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      cycleCare: 'Cycle Care',
      pcosCare: 'PCOS Explorer',
      aiInterpreter: 'Symptom Clarity AI',
      analytics: 'Analytics',
      report: 'Doctor-Visit Brief',
      language: 'Language',
      privacy: 'Privacy',
      guestMode: 'Guest Mode (Private)',
    },
    landing: {
      heroTitle: 'Small Symptoms, Big Answers.',
      heroSubtitle: 'Understand your menstrual cycle. Explore PCOS-related symptoms. Receive safe next-step guidance and generate a comprehensive health report for your doctor.',
      startAssessment: 'Start Your Assessment',
      exploreCare: 'Explore Care Modules',
      cycleCardTitle: 'Menstrual Cycle Care',
      cycleCardDesc: 'Track cycle history, calculate real cycle lengths, record flow & symptoms, and understand observed patterns safely.',
      cycleCardAction: 'Track Your Cycle',
      pcosCardTitle: 'PCOS Care Assessment',
      pcosCardDesc: 'Explore symptoms that may be associated with PCOS through guided clinical questions and prepare for an informed healthcare consultation.',
      pcosCardAction: 'Begin PCOS Assessment',
      howItWorksTitle: 'How NAARI AI Works',
      howItWorksSubtitle: 'A gentle, privacy-conscious 4-step health guidance journey',
      step1Title: '1. Describe Symptoms',
      step1Desc: 'Describe how you feel in everyday language or follow our clinical question pathways.',
      step2Title: '2. Understand Information',
      step2Desc: 'Explore reviewed medical knowledge from WHO and international clinical guidelines.',
      step3Title: '3. Receive Next Steps',
      step3Desc: 'Get safe lifestyle considerations and structured questions to ask your healthcare provider.',
      step4Title: '4. Personalized Report',
      step4Desc: 'Download an elegant, confidential A4 Health Assessment Report to share with your doctor.',
      trustTitle: 'Medically Responsible & Private',
      trustDesc: 'We prioritize patient safety above all. NAARI AI uses clinician-reviewed safety rules and never fabricates diagnoses.',
      safetyFirstBadge: 'Clinician-Reviewed Safety Engine',
      privacyBadge: '100% Private • Guest Mode Supported',
    },
    cycle: {
      title: 'Menstrual Cycle Care',
      subtitle: 'Record your cycle dates and observed symptoms. Real cycle length is calculated between consecutive period start dates.',
      logPeriod: 'Log Period Entry',
      editPeriod: 'Edit Period Entry',
      startDate: 'Period Start Date',
      endDate: 'Period End Date',
      flow: 'Flow Category',
      flowLight: 'Light',
      flowModerate: 'Moderate',
      flowHeavy: 'Heavy',
      symptomsTitle: 'Symptoms Experienced',
      symptomCramps: 'Cramps / Dysmenorrhea',
      symptomBloating: 'Bloating',
      symptomHeadache: 'Headache',
      symptomMoodSwings: 'Mood Changes',
      symptomFatigue: 'Fatigue',
      symptomBackPain: 'Lower Back Ache',
      symptomBreastTenderness: 'Breast Tenderness',
      symptomAcne: 'Skin Breakouts',
      notesPlaceholder: 'Add any optional observations or personal notes...',
      saveEntry: 'Save Entry',
      cancel: 'Cancel',
      deleteEntry: 'Delete Entry',
      historyTitle: 'Recorded Cycle History',
      emptyHistory: 'No cycle records logged yet',
      emptyHistoryDesc: 'Click "Log Period Entry" above to add your first period dates. Adding at least two entries allows NAARI AI to calculate your true cycle length.',
      cycleLengthLabel: 'Cycle Length',
      durationLabel: 'Period Duration',
      daysUnit: 'days',
      cycleCalcNote: 'Calculated as the number of days between consecutive recorded period start dates.',
      calendarTitle: 'Cycle Calendar',
      calendarLegendPeriod: 'Recorded Period Days',
      calendarLegendEstimated: 'Estimated Next Window (Guidance Only)',
    },
    pcos: {
      title: 'PCOS Care Assessment',
      subtitle: 'A structured, non-diagnostic symptom exploration to help you understand your health and prepare for your doctor visit.',
      badgeNonDiagnostic: 'Non-Diagnostic Clinical Exploration',
      step1Title: 'Cycle Regularity',
      step2Title: 'Skin & Hair Changes',
      step3Title: 'Duration & History',
      step4Title: 'Review & Symptoms',
      cycleRegularityQuestion: 'How would you describe your menstrual cycle pattern over the past 6-12 months?',
      regular: 'Regular (usually every 24–38 days)',
      irregularInfrequent: 'Irregular or Infrequent (cycles longer than 38 days, or skipping months)',
      absentAmenorrhea: 'Absent (no period for 3 or more consecutive months)',
      frequentShort: 'Frequent (periods occur closer than every 24 days)',
      unsure: 'Unsure / Have not tracked consistently',
      skinChangesQuestion: 'Have you noticed persistent acne or changes in skin texture?',
      skinNone: 'No noticeable persistent acne',
      skinMild: 'Mild occasional breakouts',
      skinModerateSevere: 'Moderate to severe acne unresponsive to regular skincare',
      skinCysticJawline: 'Deep, cystic acne, particularly around jawline and chin',
      hairChangesQuestion: 'Have you observed increased facial or body hair growth (hirsutism)?',
      hairNone: 'No noticeable increase in facial or body hair',
      hairMildUpperLip: 'Mild fine hair on upper lip or chin',
      hairNoticeableChinChest: 'Noticeable coarser hair on chin, upper lip, chest, or lower abdomen',
      hairSignificant: 'Significant coarser dark hair requiring frequent removal',
      scalpThinningQuestion: 'Have you experienced noticeable thinning of hair on the scalp (hair loss at the crown/part)?',
      durationQuestion: 'How long have you noticed these symptoms or cycle changes?',
      lessThan3Months: 'Less than 3 months',
      threeToSixMonths: '3 to 6 months',
      sixToTwelveMonths: '6 to 12 months',
      moreThan12Months: 'More than 12 months (over a year)',
      priorEvaluationQuestion: 'Have you previously been evaluated by a doctor for hormonal concerns?',
      priorNone: 'No prior medical evaluation for this',
      priorSuspected: 'A doctor previously mentioned suspected PCOS',
      priorDiagnosed: 'Formally diagnosed with PCOS previously',
      priorUltrasound: 'Had a pelvic ultrasound done previously',
      freeTextPrompt: 'Describe anything else in your own words (sleep, energy, weight changes, mood):',
      freeTextPlaceholder: 'e.g., I have been feeling extra tired, my periods come every 45-50 days, and I notice darker hair on my chin...',
      reviewTitle: 'Review Your Reported Symptoms',
      reviewSubtitle: 'Please verify the symptoms identified below before generating your health report.',
      generateReportAction: 'Generate Health Assessment Report',
    },
    ai: {
      title: 'AI Symptom Interpreter',
      subtitle: 'Type how you feel in everyday words in English, Kannada, Telugu, or Hindi. Our AI identifies symptoms, checks safety rules, and translates medical concepts into simple language.',
      inputPlaceholder: 'Describe your symptoms in your own words (e.g. My periods have been very late for 3 months, I have terrible acne on my jawline and feeling bloated...)',
      analyzeBtn: 'Analyze Symptoms',
      analyzing: 'Interpreting symptoms with safety engine...',
      selectLanguagePrompt: 'You can write in any supported language:',
      interpretationTitle: 'Symptom Understanding & Summary',
      extractedSymptoms: [],
      careCategoryIdentified: 'Identified Care Category',
      missingInfoPrompt: 'Helpful details that may clarify your situation:',
      userReviewNotice: 'You can add or remove any interpreted symptoms below to ensure 100% accuracy:',
      addSymptomPlaceholder: 'Add another symptom (e.g., Pelvic heaviness)',
      addBtn: 'Add',
      removeBtn: 'Remove',
      urgentWarningTitle: 'Urgent Care Advisory Detected',
      verifiedSourcesTitle: 'Curated Medical Sources Cited',
      viewGuidanceAction: 'View Educational Guidance',
    },
    analytics: {
      title: 'Cycle Pattern Intelligence',
      subtitle: 'Visual analytics derived strictly from your logged cycle data. No invented scores or predictive guesses.',
      avgCycleLength: 'Average Cycle Length',
      avgPeriodDuration: 'Average Period Duration',
      recordedCycles: 'Total Cycles Recorded',
      cycleLengthTrend: 'Cycle Length History (Days)',
      periodDurationTrend: 'Period Duration History (Days)',
      symptomFrequency: 'Recorded Symptom Frequency',
      realDataNote: 'All observations are computed directly from consecutive recorded start dates.',
      insufficientDataNotice: 'At least 2 consecutive period entries are required to calculate cycle length. Please log your dates in Cycle Care.',
    },
    report: {
      title: 'Personalized Women\'s Health Assessment Report',
      tagline: 'Small Symptoms, Big Answers.',
      badge: 'Official Confidential Clinical Summary',
      referenceId: 'Report Reference',
      generatedOn: 'Generated On',
      coverSection: 'Report Overview',
      userReportedSection: 'Section 1: User-Reported Information',
      cycleHistorySection: 'Section 2: Recorded Cycle History & Patterns',
      symptomInterpretationSection: 'Section 3: Symptom Interpretation & Concepts',
      careGuidanceSection: 'Section 4: Care Guidance & Doctor Questions',
      importantInfoSection: 'Section 5: Important Medical Notice & Disclaimer',
      primaryConcern: 'Primary Care Focus',
      reportedSymptoms: 'Reported & Confirmed Symptoms',
      cycleLengthStat: 'Observed Cycle Length',
      periodDurationStat: 'Observed Period Duration',
      nextStepsTitle: 'Safe Next Steps',
      questionsForDoctorTitle: 'Recommended Questions for Your Healthcare Provider',
      sourcesTitle: 'Reviewed Medical References Cited',
      downloadPdf: 'Download PDF Report',
      printReport: 'Print / Save as PDF',
      backToDashboard: 'Back to Dashboard',
    },
    settings: {
      title: 'Settings & Privacy Controls',
      languageHeading: 'Application Language',
      privacyHeading: 'Data Privacy & Local Storage',
      privacyDesc: 'NAARI AI operates on a privacy-first foundation. Your health information is stored in your private browser session. No personal identifying information is tracked or shared.',
      guestModeBadge: 'Active: Private Guest Mode',
      clearDataBtn: 'Clear All My Health Records',
      clearDataConfirm: 'Are you sure you want to erase all logged cycles and assessment reports? This action cannot be undone.',
      close: 'Close',
    },
    common: {
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      next: 'Next',
      back: 'Back',
      done: 'Done',
      required: 'Required',
      optional: 'Optional',
      loading: 'Loading...',
      error: 'An error occurred. Please try again.',
      retry: 'Retry',
    },
  },
  kn: {
    brand: {
      name: 'ನಾರಿ AI (NAARI AI)',
      tagline: 'ಸಣ್ಣ ಲಕ್ಷಣಗಳು, ದೊಡ್ಡ ಪರಿಹಾರಗಳು.',
      subtagline: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಯಿರಿ. ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮುಂದಿನ ಹೆಜ್ಜೆ ಇರಿಸಿ.',
      shortDesc: 'ಮುಟ್ಟಿನ ಚಕ್ರ ಮತ್ತು ಪಿಸಿಒಎಸ್ (PCOS) ಆರೈಕೆಗಾಗಿ ಸುರಕ್ಷಿತ, ಬಹುಭಾಷಾ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿ.',
      nonDiagnosticDisclaimer: 'ನಾರಿ AI ಕೇವಲ ಶೈಕ್ಷಣಿಕ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಮತ್ತು ಲಕ್ಷಣಗಳ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ. ಇದು ಯಾವುದೇ ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ ಅಥವಾ ವೈದ್ಯರ ಚಿಕಿತ್ಸೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.',
    },
    nav: {
      home: 'ಮುಖಪುಟ',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      cycleCare: 'ಮುಟ್ಟಿನ ಆರೈಕೆ',
      pcosCare: 'ಪಿಸಿಒಎಸ್ ಪರಿಶೋಧನೆ',
      aiInterpreter: 'ಸಿಂಪ್ಟಮ್ ಕ್ಲಾರಿಟಿ AI',
      analytics: 'ವಿಶ್ಲೇಷಣೆಗಳು',
      report: 'ವೈದ್ಯರ ಭೇಟಿಯ ಸಾರಾಂಶ (Brief)',
      language: 'ಭಾಷೆ',
      privacy: 'ಗೌಪ್ಯತೆ',
      guestMode: 'ಅತಿಥಿ ಮೋಡ್ (ಖಾಸಗಿ)',
    },
    landing: {
      heroTitle: 'ಸಣ್ಣ ಲಕ್ಷಣಗಳು, ದೊಡ್ಡ ಪರಿಹಾರಗಳು.',
      heroSubtitle: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರದ ಮಾದರಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಪಿಸಿಒಎಸ್ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಸುರಕ್ಷಿತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಲು ವರದಿ ಸಿದ್ಧಪಡಿಸಿ.',
      startAssessment: 'ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ',
      exploreCare: 'ಆರೈಕೆ ವಿಭಾಗಗಳನ್ನು ನೋಡಿ',
      cycleCardTitle: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ಆರೈಕೆ',
      cycleCardDesc: 'ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು, ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ ಮತ್ತು ನೋವಿನ ಲಕ್ಷಣಗಳನ್ನು ದಾಖಲಿಸಿ, ನಿಮ್ಮ ಚಕ್ರದ ಅವಧಿಯನ್ನು ನಿಖರವಾಗಿ ತಿಳಿಯಿರಿ.',
      cycleCardAction: 'ಚಕ್ರವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      pcosCardTitle: 'ಪಿಸಿಒಎಸ್ (PCOS) ಪರೀಕ್ಷೆ',
      pcosCardDesc: 'ಪಿಸಿಒಎಸ್ ಸಂಬಂಧಿತ ಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ವೈದ್ಯಕೀಯ ಪ್ರಶ್ನಾವಳಿಗಳ ಮೂಲಕ ತಿಳಿದುಕೊಳ್ಳಿ ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಿ.',
      pcosCardAction: 'ಪಿಸಿಒಎಸ್ ಪರೀಕ್ಷೆ ಆರಂಭಿಸಿ',
      howItWorksTitle: 'ನಾರಿ AI ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?',
      howItWorksSubtitle: 'ನಿಮ್ಮ ಗೌಪ್ಯತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡುವ 4 ಹಂತಗಳ ಆರೋಗ್ಯ ಪಯಣ',
      step1Title: '೧. ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
      step1Desc: 'ನಿಮ್ಮ ಸ್ವಂತ ಭಾಷೆಯಲ್ಲಿ ಲಕ್ಷಣಗಳನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
      step2Title: '೨. ಮಾಹಿತಿಯನ್ನು ಗ್ರಹಿಸಿ',
      step2Desc: 'WHO ಮತ್ತು ಜಾಗತಿಕ ವೈದ್ಯಕೀಯ ಸಂಸ್ಥೆಗಳು ಪರಿಶೀಲಿಸಿದ ನಿಖರ ಮಾಹಿತಿಯನ್ನು ತಿಳಿಯಿರಿ.',
      step3Title: '೩. ಸುರಕ್ಷಿತ ಮುಂದಿನ ಹೆಜ್ಜೆ',
      step3Desc: 'ಜೀವನಶೈಲಿ ಸಲಹೆಗಳು ಮತ್ತು ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
      step4Title: '೪. ವೈಯಕ್ತಿಕ ವರದಿ',
      step4Desc: 'ವೈದ್ಯರಿಗೆ ತೋರಿಸಲು ಗೌಪ್ಯವಾದ A4 ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
      trustTitle: 'ವೈದ್ಯಕೀಯ ಜವಾಬ್ದಾರಿ ಮತ್ತು ಗೌಪ್ಯತೆ',
      trustDesc: 'ರೋಗಿಯ ಸುರಕ್ಷತೆಯೇ ನಮ್ಮ ಧ್ಯೇಯ. ನಾರಿ AI ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸುತ್ತದೆ ಮತ್ತು ಸುಳ್ಳು ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ.',
      safetyFirstBadge: 'ಪರಿಶೀಲಿತ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ',
      privacyBadge: '೧೦೦% ಗೌಪ್ಯ • ಅತಿಥಿ ಮೋಡ್ ಬೆಂಬಲ',
    },
    cycle: {
      title: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ಆರೈಕೆ',
      subtitle: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಮತ್ತು ಲಕ್ಷಣಗಳನ್ನು ದಾಖಲಿಸಿ. ಸತತ ಎರಡು ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳ ನಡುವಿನ ದಿನಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.',
      logPeriod: 'ಮುಟ್ಟಿನ ವಿವರ ದಾಖಲಿಸಿ',
      editPeriod: 'ವಿವರ ತಿದ್ದುಪಡಿ ಮಾಡಿ',
      startDate: 'ಮುಟ್ಟು ಆರಂಭವಾದ ದಿನಾಂಕ',
      endDate: 'ಮುಟ್ಟು ಮುಕ್ತಾಯವಾದ ದಿನಾಂಕ',
      flow: 'ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ',
      flowLight: 'ಕಡಿಮೆ (Light)',
      flowModerate: 'ಮಧ್ಯಮ (Moderate)',
      flowHeavy: 'ಹೆಚ್ಚು (Heavy)',
      symptomsTitle: 'ಅನುಭವಿಸಿದ ಲಕ್ಷಣಗಳು',
      symptomCramps: 'ಹೊಟ್ಟೆ ನೋವು / ಸೆಳೆತ',
      symptomBloating: 'ಹೊಟ್ಟೆ ಉಬ್ಬರ',
      symptomHeadache: 'ತಲೆನೋವು',
      symptomMoodSwings: 'ಮನಸ್ಥಿತಿಯ ಬದಲಾವಣೆ',
      symptomFatigue: 'ಆಯಾಸ / ಸುಸ್ತು',
      symptomBackPain: 'ಬೆನ್ನು ನೋವು',
      symptomBreastTenderness: 'ಸ್ತನಗಳ ಸೂಕ್ಷ್ಮತೆ',
      symptomAcne: 'ಮುಖದ ಮೊಡವೆಗಳು',
      notesPlaceholder: 'ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿಗಳನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ...',
      saveEntry: 'ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      deleteEntry: 'ಅಳಿಸಿ',
      historyTitle: 'ದಾಖಲಾದ ಮುಟ್ಟಿನ ಇತಿಹಾಸ',
      emptyHistory: 'ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳಿಲ್ಲ',
      emptyHistoryDesc: 'ಮೊದಲ ದಿನಾಂಕವನ್ನು ದಾಖಲಿಸಲು ಮೇಲಿನ ಬಟನ್ ಒತ್ತಿ. ಕನಿಷ್ಠ ೨ ದಾಖಲೆಗಳಿದ್ದರೆ ನಿಖರ ಚಕ್ರದ ಅವಧಿ ತಿಳಿಯುತ್ತದೆ.',
      cycleLengthLabel: 'ಚಕ್ರದ ಅವಧಿ',
      durationLabel: 'ಮುಟ್ಟಿನ ದಿನಗಳು',
      daysUnit: 'ದಿನಗಳು',
      cycleCalcNote: 'ಸತತ ಎರಡು ಮುಟ್ಟಿನ ಆರಂಭಿಕ ದಿನಗಳ ನಡುವಿನ ಅಂತರ.',
      calendarTitle: 'ಕ್ಯಾಲೆಂಡರ್ ನೋಟ',
      calendarLegendPeriod: 'ದಾಖಲಾದ ಮುಟ್ಟಿನ ದಿನಗಳು',
      calendarLegendEstimated: 'ಅಂದಾಜು ಮುಂದಿನ ದಿನಗಳು (ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ)',
    },
    pcos: {
      title: 'ಪಿಸಿಒಎಸ್ (PCOS) ಆರೈಕೆ ಮೌಲ್ಯಮಾಪನ',
      subtitle: 'ಇದು ರೋಗನಿರ್ಣಯವಲ್ಲ, ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಲು ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶಿ.',
      badgeNonDiagnostic: 'ರೋಗನಿರ್ಣಯ ರಹಿತ ಕ್ಲಿನಿಕಲ್ ಪರಿಶೀಲನೆ',
      step1Title: 'ಮುಟ್ಟಿನ ಕ್ರಮಬದ್ಧತೆ',
      step2Title: 'ಚರ್ಮ ಮತ್ತು ಕೂದಲಿನ ಬದಲಾವಣೆ',
      step3Title: 'ಅವಧಿ ಮತ್ತು ಇತಿಹಾಸ',
      step4Title: 'ಪರಿಶೀಲನೆ ಮತ್ತು ದೃಢೀಕರಣ',
      cycleRegularityQuestion: 'ಕಳೆದ ೬-೧೨ ತಿಂಗಳುಗಳಲ್ಲಿ ನಿಮ್ಮ ಮುಟ್ಟಿನ ಕ್ರಮ ಹೇಗಿದೆ?',
      regular: 'ಕ್ರಮಬದ್ಧವಾಗಿದೆ (ಸಾಮಾನ್ಯವಾಗಿ ೨೪–೩೮ ದಿನಗಳಿಗೊಮ್ಮೆ)',
      irregularInfrequent: 'ಅನಿಯಮಿತ ಅಥವಾ ವಿಳಂಬ (೩೮ ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು, ಅಥವಾ ತಿಂಗಳು ತಪ್ಪುವುದು)',
      absentAmenorrhea: 'ಮುಟ್ಟು ನಿಂತಿದೆ (ಸತತ ೩ ತಿಂಗಳುಗಳಿಂದ ಬಂದಿಲ್ಲ)',
      frequentShort: 'ಅತಿ ಬೇಗನೆ ಬರುವುದು (೨೪ ದಿನಗಳಿಗಿಂತ ಮುಂಚೆ)',
      unsure: 'ಖಚಿತವಿಲ್ಲ / ನಿಖರವಾಗಿ ಗಮನಿಸಿಲ್ಲ',
      skinChangesQuestion: 'ಮುಖದಲ್ಲಿ ನಿರಂತರ ಮೊಡವೆಗಳು ಅಥವಾ ಚರ್ಮದ ಕಪ್ಪಾಗುವಿಕೆ ಇದೆಯೇ?',
      skinNone: 'ಯಾವುದೇ ಗಮನಾರ್ಹ ಮೊಡವೆಗಳಿಲ್ಲ',
      skinMild: 'ಸಾಧಾರಣ ಮೊಡವೆಗಳು',
      skinModerateSevere: 'ಚರ್ಮದ ಆರೈಕೆಗೆ ಸ್ಪಂದಿಸದ ತೀವ್ರ ಮೊಡವೆಗಳು',
      skinCysticJawline: 'ದವಡೆ ಮತ್ತು ಗಲ್ಲದ ಸುತ್ತ ಗಟ್ಟಿಯಾದ ನೋವಿನ ಮೊಡವೆಗಳು',
      hairChangesQuestion: 'ಮುಖ ಅಥವಾ ದೇಹದ ಇತರ ಭಾಗಗಳಲ್ಲಿ ಅನಗತ್ಯ ಕೂದಲು ಬೆಳೆಯುತ್ತಿದೆಯೇ?',
      hairNone: 'ಯಾವುದೇ ಅತಿಯಾದ ಕೂದಲು ಇಲ್ಲ',
      hairMildUpperLip: 'ಮೇಲ್ತುಟಿ ಅಥವಾ ಗಲ್ಲದ ಮೇಲೆ ಲಘು ಕೂದಲು',
      hairNoticeableChinChest: 'ಗಲ್ಲ, ಎದೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಮೇಲೆ ದಪ್ಪ ಕೂದಲು',
      hairSignificant: 'ಹೆಚ್ಚು ದಪ್ಪ ಕೂದಲು ಕಂಡುಬರುತ್ತಿದೆ',
      scalpThinningQuestion: 'ತಲೆಯ ನೆತ್ತಿಯ ಭಾಗದಲ್ಲಿ ಕೂದಲು ಉದುರಿ ತೆಳುವಾಗುತ್ತಿದೆಯೇ?',
      durationQuestion: 'ಈ ಲಕ್ಷಣಗಳು ಎಷ್ಟು ಸಮಯದಿಂದ ಕಂಡುಬರುತ್ತಿವೆ?',
      lessThan3Months: '೩ ತಿಂಗಳುಗಳಿಗಿಂತ ಕಡಿಮೆ',
      threeToSixMonths: '೩ ರಿಂದ ೬ ತಿಂಗಳುಗಳು',
      sixToTwelveMonths: '೬ ರಿಂದ ೧೨ ತಿಂಗಳುಗಳು',
      moreThan12Months: '೧ ವರ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಮಯದಿಂದ',
      priorEvaluationQuestion: 'ಹಿಂದೆ ಹಾರ್ಮೋನ್ ಸಮಸ್ಯೆಗಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದೀರಾ?',
      priorNone: 'ಇದುವರೆಗೆ ಯಾವುದೇ ತಪಾಸಣೆ ಮಾಡಿಸಿಲ್ಲ',
      priorSuspected: 'ವೈದ್ಯರು ಪಿಸಿಒಎಸ್ ಇರಬಹುದು ಎಂದು ಸಂಶಯ ವ್ಯಕ್ತಪಡಿಸಿದ್ದರು',
      priorDiagnosed: 'ಹಿಂದೆ ಪಿಸಿಒಎಸ್ ಇದೆ ಎಂದು ವೈದ್ಯರು ದೃಢಪಡಿಸಿದ್ದರು',
      priorUltrasound: 'ಪೆಲ್ವಿಕ್ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮಾಡಿಸಲಾಗಿದೆ',
      freeTextPrompt: 'ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ಇತರ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ (ಆಯಾಸ, ತೂಕ, ನಿದ್ರೆ):',
      freeTextPlaceholder: 'ಉದಾ: ನನಗೆ ಮುಟ್ಟು ಸರಿಯಾಗಿ ಬರುತ್ತಿಲ್ಲ, ತುಂಬಾ ಸುಸ್ತು ಅನಿಸುತ್ತದೆ, ಮುಖದಲ್ಲಿ ಮೊಡವೆಗಳು ಹೆಚ್ಚಾಗಿವೆ...',
      reviewTitle: 'ಗುರುತಿಸಲಾದ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      reviewSubtitle: 'ವರದಿ ಸಿದ್ಧಪಡಿಸುವ ಮೊದಲು ಕೆಳಗಿನ ಲಕ್ಷಣಗಳು ಸರಿಯಾಗಿವೆಯೇ ಎಂದು ದೃಢೀಕರಿಸಿ.',
      generateReportAction: 'ಆರೋಗ್ಯ ವರದಿ ರಚಿಸಿ',
    },
    ai: {
      title: 'AI ಲಕ್ಷಣ ವಿಶ್ಲೇಷಕ',
      subtitle: 'ಕನ್ನಡದಲ್ಲಿ ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಬರೆಯಿರಿ. ನಮ್ಮ AI ವ್ಯವಸ್ಥೆಯು ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸಿ, ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥೈಸುತ್ತದೆ.',
      inputPlaceholder: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ (ಉದಾ: ನನಗೆ ೩ ತಿಂಗಳಿಂದ ಮುಟ್ಟು ಬಂದಿಲ್ಲ, ಮುಖದಲ್ಲಿ ಮೊಡವೆಗಳು ಹೆಚ್ಚಾಗಿವೆ ಮತ್ತು ಹೊಟ್ಟೆ ನೋವಿದೆ...)',
      analyzeBtn: 'ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
      analyzing: 'ಸುರಕ್ಷತಾ ನಿಯಮಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      selectLanguagePrompt: 'ನೀವು ಬೆಂಬಲಿತ ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಬಹುದು:',
      interpretationTitle: 'ಲಕ್ಷಣಗಳ ವಿವರಣೆ ಮತ್ತು ಸಾರಾಂಶ',
      extractedSymptoms: [],
      careCategoryIdentified: 'ಗುರುತಿಸಲಾದ ವಿಭಾಗ',
      missingInfoPrompt: 'ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ ಅಗತ್ಯವಿದೆ:',
      userReviewNotice: '೧೦೦% ನಿಖರತೆಗಾಗಿ ನೀವು ಲಕ್ಷಣಗಳನ್ನು ಸೇರಿಸಬಹುದು ಅಥವಾ ತೆಗೆದುಹಾಕಬಹುದು:',
      addSymptomPlaceholder: 'ಬೇರೆ ಲಕ್ಷಣ ಸೇರಿಸಿ (ಉದಾ: ಕೆಳಹೊಟ್ಟೆ ಭಾರ)',
      addBtn: 'ಸೇರಿಸಿ',
      removeBtn: 'ತೆಗೆದುಹಾಕಿ',
      urgentWarningTitle: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ಗಮನದ ಅಗತ್ಯವಿದೆ',
      verifiedSourcesTitle: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಮೂಲಗಳು',
      viewGuidanceAction: 'ಮಾರ್ಗದರ್ಶನ ನೋಡಿ',
    },
    analytics: {
      title: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ವಿಶ್ಲೇಷಣೆ',
      subtitle: 'ನಿಮ್ಮ ನೈಜ ದಾಖಲೆಗಳಿಂದ ಮಾತ್ರ ಸಿದ್ಧಪಡಿಸಲಾದ ಮಾಹಿತಿ. ಯಾವುದೇ ಕಾಲ್ಪನಿಕ ಲೆಕ್ಕಾಚಾರಗಳಿಲ್ಲ.',
      avgCycleLength: 'ಸರಾಸರಿ ಚಕ್ರದ ಅವಧಿ',
      avgPeriodDuration: 'ಮುಟ್ಟಿನ ಸರಾಸರಿ ದಿನಗಳು',
      recordedCycles: 'ದಾಖಲಾದ ಒಟ್ಟು ಚಕ್ರಗಳು',
      cycleLengthTrend: 'ಚಕ್ರದ ಅವಧಿಯ ಇತಿಹಾಸ (ದಿನಗಳಲ್ಲಿ)',
      periodDurationTrend: 'ಮುಟ್ಟಿನ ದಿನಗಳ ಇತಿಹಾಸ (ದಿನಗಳಲ್ಲಿ)',
      symptomFrequency: 'ಲಕ್ಷಣಗಳ ಆವರ್ತನ',
      realDataNote: 'ಎಲ್ಲಾ ಮಾಹಿತಿಯು ದಾಖಲಾದ ಆರಂಭಿಕ ದಿನಾಂಕಗಳಿಂದಲೇ ಲೆಕ್ಕಹಾಕಲ್ಪಟ್ಟಿದೆ.',
      insufficientDataNotice: 'ಚಕ್ರದ ಅವಧಿಯನ್ನು ತಿಳಿಯಲು ಕನಿಷ್ಠ ೨ ಮುಟ್ಟಿನ ದಾಖಲೆಗಳು ಅಗತ್ಯವಿದೆ.',
    },
    report: {
      title: 'ವೈಯಕ್ತಿಕ ಮಹಿಳಾ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ ವರದಿ',
      tagline: 'ಸಣ್ಣ ಲಕ್ಷಣಗಳು, ದೊಡ್ಡ ಪರಿಹಾರಗಳು.',
      badge: 'ಅಧಿಕೃತ ಗೌಪ್ಯ ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶ',
      referenceId: 'ವರದಿ ಸಂಖ್ಯೆ',
      generatedOn: 'ರಚಿಸಿದ ದಿನಾಂಕ',
      coverSection: 'ವರದಿಯ ಮುನ್ನೋಟ',
      userReportedSection: 'ವಿಭಾಗ ೧: ಬಳಕೆದಾರರು ನೀಡಿದ ಮಾಹಿತಿ',
      cycleHistorySection: 'ವಿಭಾಗ ೨: ಮುಟ್ಟಿನ ಚಕ್ರದ ಇತಿಹಾಸ',
      symptomInterpretationSection: 'ವಿಭಾಗ ೩: ಲಕ್ಷಣಗಳ ವಿವರಣೆ',
      careGuidanceSection: 'ವಿಭಾಗ ೪: ಮುಂದಿನ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ವೈದ್ಯರ ಪ್ರಶ್ನೆಗಳು',
      importantInfoSection: 'ವಿಭಾಗ ೫: ಪ್ರಮುಖ ವೈದ್ಯಕೀಯ ಎಚ್ಚರಿಕೆ',
      primaryConcern: 'ಮುಖ್ಯ ಕಾಳಜಿ',
      reportedSymptoms: 'ದೃಢಪಡಿಸಿದ ಲಕ್ಷಣಗಳು',
      cycleLengthStat: 'ಕಂಡುಬಂದ ಚಕ್ರದ ಅವಧಿ',
      periodDurationStat: 'ಮುಟ್ಟಿನ ಸರಾಸರಿ ಅವಧಿ',
      nextStepsTitle: 'ಸುರಕ್ಷಿತ ಮುಂದಿನ ಕ್ರಮಗಳು',
      questionsForDoctorTitle: 'ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು',
      sourcesTitle: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಉಲ್ಲೇಖಗಳು',
      downloadPdf: 'PDF ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      printReport: 'ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ',
      backToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮರಳಿ',
    },
    settings: {
      title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ',
      languageHeading: 'ಭಾಷೆ ಆಯ್ಕೆ',
      privacyHeading: 'ಮಾಹಿತಿ ಗೌಪ್ಯತೆ',
      privacyDesc: 'ನಾರಿ AI ನಿಮ್ಮ ಖಾಸಗಿತನವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಗೌರವಿಸುತ್ತದೆ. ನಿಮ್ಮ ಮಾಹಿತಿಯು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
      guestModeBadge: 'ಸಕ್ರಿಯ: ಖಾಸಗಿ ಅತಿಥಿ ಮೋಡ್',
      clearDataBtn: 'ನನ್ನ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಅಳಿಸಿ',
      clearDataConfirm: 'ನಿಮ್ಮ ಎಲ್ಲಾ ಮುಟ್ಟಿನ ದಾಖಲೆಗಳನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದನ್ನು ಮರಳಿ ಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.',
      close: 'ಮುಚ್ಚಿ',
    },
    common: {
      yes: 'ಹೌದು',
      no: 'ಇಲ್ಲ',
      save: 'ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      delete: 'ಅಳಿಸಿ',
      next: 'ಮುಂದೆ',
      back: 'ಹಿಂದೆ',
      done: 'ಮುಕ್ತಾಯ',
      required: 'ಕಡ್ಡಾಯ',
      optional: 'ಐಚ್ಛಿಕ',
      loading: 'ತೆರೆಯಲಾಗುತ್ತಿದೆ...',
      error: 'ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
      retry: 'ಪುನಃ ಪ್ರಯತ್ನಿಸಿ',
    },
  },
  te: {
    brand: {
      name: 'నారీ AI (NAARI AI)',
      tagline: 'చిన్న లక్షణాలు, పెద్ద సమాధానాలు.',
      subtagline: 'మీ ఋతుచక్రాన్ని అర్థం చేసుకోండి. లక్షణాలను విశ్లేషించండి. ఆత్మవిశ్వాసంతో ముందడుగు వేయండి.',
      shortDesc: 'ఋతుచక్రం మరియు పీసీఓఎస్ (PCOS) సంరక్షణ కోసం సురక్షితమైన, బహుభాషా ఆరోగ్య వేదిక.',
      nonDiagnosticDisclaimer: 'నారీ AI కేవలం విద్యాపరమైన ఆరోగ్య సమాచారం మరియు లక్షణాల మార్గదర్శకత్వాన్ని మాత్రమే అందిస్తుంది. ఇది ఎలాంటి వ్యాధి నిర్ధారణ చేయదు లేదా డాక్టర్ చికిత్సకు ప్రత్యామ్నాయం కాదు.',
    },
    nav: {
      home: 'హోమ్',
      dashboard: 'డ్యాష్‌బోర్డ్',
      cycleCare: 'ఋతుచక్ర సంరక్షణ',
      pcosCare: 'పీసీఓఎస్ పరిశోధన',
      aiInterpreter: 'సింప్టమ్ క్లారిటీ AI',
      analytics: 'విశ్లేషణలు',
      report: 'డాక్టర్ విజిట్ బ్రీఫ్ (Brief)',
      language: 'భాష',
      privacy: 'గోప్యత',
      guestMode: 'గెస్ట్ మోడ్ (ప్రైవేట్)',
    },
    landing: {
      heroTitle: 'చిన్న లక్షణాలు, పెద్ద సమాధానాలు.',
      heroSubtitle: 'మీ ఋతుచక్రం సరళిని అర్థం చేసుకోండి. పీసీఓఎస్ లక్షణాలను అన్వేషించండి. సురక్షిత మార్గదర్శకత్వం పొందండి మరియు వైద్యుల కోసం నివేదికను సిద్ధం చేయండి.',
      startAssessment: 'పరిశీలన ప్రారంభించండి',
      exploreCare: 'సంరక్షణ విభాగాలు',
      cycleCardTitle: 'ఋతుచక్ర సంరక్షణ',
      cycleCardDesc: 'పీరియడ్స్ తేదీలు, రక్తస్రావ పరిమాణం, నొప్పుల లక్షణాలను నమోదు చేసి నిజమైన చక్ర కాలాన్ని సురక్షితంగా లెక్కించండి.',
      cycleCardAction: 'చక్రాన్ని ట్రాక్ చేయండి',
      pcosCardTitle: 'పీసీఓఎస్ (PCOS) అంచనా',
      pcosCardDesc: 'పీసీఓఎస్ సంకేతాలపై వైద్య ప్రశ్నల ద్వారా అవగాహన పెంచుకుని, డాక్టర్ సంప్రదింపులకు సిద్ధం కండి.',
      pcosCardAction: 'పీసీఓఎస్ పరిశీలన మొదలుపెట్టండి',
      howItWorksTitle: 'నారీ AI ఎలా పనిచేస్తుంది?',
      howItWorksSubtitle: 'మీ గోప్యతకు ప్రాధాన్యతనిచ్చే 4 దశల ఆరోగ్య ప్రయాణం',
      step1Title: '౧. లక్షణాలను తెలపండి',
      step1Desc: 'మీ సాధారణ భాషలో లక్షణాలను రాయండి లేదా క్లినికల్ ప్రశ్నలకు సమాధానమివ్వండి.',
      step2Title: '౨. సమాచారాన్ని అర్థం చేసుకోండి',
      step2Desc: 'WHO మరియు అంతర్జాతీయ మార్గదర్శకాల ఆధారంగా రూపొందించిన ప్రామాణిక సమాచారం.',
      step3Title: '౩. సురక్షిత తదుపరి చర్యలు',
      step3Desc: 'జీవనశైలి మార్పులు మరియు డాక్టర్‌ను అడగవలసిన ముఖ్యమైన ప్రశ్నలు.',
      step4Title: '౪. వ్యక్తిగత నివేదిక',
      step4Desc: 'డాక్టర్‌తో పంచుకోవడానికి A4 హెల్త్ రిపోర్ట్‌ను డౌన్‌లోడ్ చేసుకోండి.',
      trustTitle: 'బాధ్యతాయుత వైద్యం & గోప్యత',
      trustDesc: 'రోగి భద్రతే మా ప్రథమ ప్రాధాన్యత. నారీ AI క్లినికల్ భద్రతా నియమాలను పాటిస్తుంది మరియు తప్పుడు వ్యాధి నిర్ధారణలు చేయదు.',
      safetyFirstBadge: 'క్లినికల్ భద్రతా వ్యవస్థ',
      privacyBadge: '౧౦౦% ప్రైవేట్ • గెస్ట్ మోడ్ సపోర్ట్',
    },
    cycle: {
      title: 'ఋతుచక్ర సంరక్షణ',
      subtitle: 'మీ పీరియడ్స్ తేదీలను నమోదు చేయండి. రెండు వరుస పీరియడ్స్ ప్రారంభ తేదీల మధ్య చక్ర నిడివి లెక్కించబడుతుంది.',
      logPeriod: 'పీరియడ్ వివరాలు నమోదు చేయండి',
      editPeriod: 'వివరాలు సవరించండి',
      startDate: 'పీరియడ్ ప్రారంభ తేదీ',
      endDate: 'పీరియడ్ ముగింపు తేదీ',
      flow: 'రక్తస్రావ పరిమాణం',
      flowLight: 'తక్కువ (Light)',
      flowModerate: 'మధ్యస్థం (Moderate)',
      flowHeavy: 'ఎక్కువ (Heavy)',
      symptomsTitle: 'అనుభవించిన లక్షణాలు',
      symptomCramps: 'కడుపు నొప్పి / తిమ్మిరి',
      symptomBloating: 'కడుపు ఉబ్బరం',
      symptomHeadache: 'తలనొప్పి',
      symptomMoodSwings: 'మూడ్ మార్పులు',
      symptomFatigue: 'అలసట',
      symptomBackPain: 'నడుము నొప్పి',
      symptomBreastTenderness: 'రొమ్ముల సున్నితత్వం',
      symptomAcne: 'మొటిమలు',
      notesPlaceholder: 'ఇతర గమనికలు ఏవైనా ఉంటే ఇక్కడ రాయండి...',
      saveEntry: 'భద్రపరచండి',
      cancel: 'రద్దు చేయండి',
      deleteEntry: 'తొలగించండి',
      historyTitle: 'నమోదైన ఋతుచక్ర చరిత్ర',
      emptyHistory: 'ఇంకా ఎలాంటి రికార్డులు లేవు',
      emptyHistoryDesc: 'మీ మొదటి తేదీని నమోదు చేయడానికి పైన క్లిక్ చేయండి. కనీసం 2 నమోదులు ఉంటే సరైన చక్ర కాలం లెక్కింపబడుతుంది.',
      cycleLengthLabel: 'చక్ర వ్యవధి',
      durationLabel: 'పీరియడ్ రోజుల సంఖ్య',
      daysUnit: 'రోజులు',
      cycleCalcNote: 'వరుస పీరియడ్స్ ప్రారంభ తేదీల మధ్య వ్యవధి ఆధారంగా లెక్కించబడింది.',
      calendarTitle: 'క్యాలెండర్ దృశ్యం',
      calendarLegendPeriod: 'నమోదైన పీరియడ్ రోజులు',
      calendarLegendEstimated: 'అంచనా వేసిన రాబోయే రోజులు (మార్గదర్శకత్వం కొరకు మాత్రమే)',
    },
    pcos: {
      title: 'పీసీఓఎస్ (PCOS) సంరక్షణ అంచనా',
      subtitle: 'ఇది వ్యాధి నిర్ధారణ కాదు; మీ లక్షణాలను అర్థం చేసుకోవడానికి మరియు వైద్యులను సంప్రదించడానికి సహకరించే గైడ్.',
      badgeNonDiagnostic: 'వ్యాధి నిర్ధారణ రహిత క్లినికల్ అన్వేషణ',
      step1Title: 'చక్ర క్రమబద్ధత',
      step2Title: 'చర్మం & జుట్టు మార్పులు',
      step3Title: 'కాలవ్యవధి & చరిత్ర',
      step4Title: 'సమీక్ష & లక్షణాలు',
      cycleRegularityQuestion: 'గత 6-12 నెలల్లో మీ పీరియడ్స్ క్రమం ఎలా ఉంది?',
      regular: 'క్రమబద్ధంగా (సాధారణంగా 24–38 రోజులకు ఒకసారి)',
      irregularInfrequent: 'అనియమితం / ఆలస్యం (38 రోజుల కంటే ఎక్కువ, లేదా నెలలు దాటడం)',
      absentAmenorrhea: 'రాకపోవడం (వరుసగా 3 లేదా అంతకంటే ఎక్కువ నెలలు రాలేదు)',
      frequentShort: 'చాలా త్వరగా రావడం (24 రోజుల కంటే ముందే)',
      unsure: 'ఖచ్చితంగా తెలియదు / సరిగ్గా గమనించలేదు',
      skinChangesQuestion: 'ముఖంపై మొటిమలు లేదా చర్మం నల్లబడటం వంటివి ఉన్నాయా?',
      skinNone: 'ఎలాంటి ప్రత్యేక మొటిమలు లేవు',
      skinMild: 'సాధారణ మొటిమలు',
      skinModerateSevere: 'తగ్గని తీవ్రమైన మొటిమలు',
      skinCysticJawline: 'దవడ, గడ్డం చుట్టూ నొప్పి కలిగించే గట్టి మొటిమలు',
      hairChangesQuestion: 'ముఖం లేదా శరీరంపై అవాంఛిత రోమాలు పెరుగుతున్నాయా?',
      hairNone: 'ఎలాంటి అదనపు రోమాలు లేవు',
      hairMildUpperLip: 'పై పెదవి లేదా గడ్డంపై తేలికపాటి రోమాలు',
      hairNoticeableChinChest: 'గడ్డం, ఛాతీ లేదా పొట్టపై స్పష్టమైన ముతక రోమాలు',
      hairSignificant: 'బాగా ఎక్కువగా కనిపిస్తున్న ముతక రోమాలు',
      scalpThinningQuestion: 'తల మధ్యభాగంలో జుట్టు రాలి పలచబడుతోందా?',
      durationQuestion: 'ఈ లక్షణాలు ఎంతకాలంగా కనిపిస్తున్నాయి?',
      lessThan3Months: '3 నెలల కంటే తక్కువ',
      threeToSixMonths: '3 నుండి 6 నెలలు',
      sixToTwelveMonths: '6 నుండి 12 నెలలు',
      moreThan12Months: '1 సంవత్సరం కంటే ఎక్కువ కాలంగా',
      priorEvaluationQuestion: 'ఇంతకు ముందు హార్మోన్ల సమస్యల కోసం డాక్టర్‌ను సంప్రదించారా?',
      priorNone: 'ఎలాంటి పరీక్షలు చేయించుకోలేదు',
      priorSuspected: 'గతంలో డాక్టర్ పీసీఓఎస్ ఉండవచ్చని అనుమానించారు',
      priorDiagnosed: 'గతంలో పీసీఓఎస్ ఉన్నట్లు నిర్ధారించబడింది',
      priorUltrasound: 'పెల్విక్ అల్ట్రాసౌండ్ స్కాన్ చేయబడింది',
      freeTextPrompt: 'మీ మాటల్లో ఇతర వివరాలు రాయండి (అలసట, బరువు, నిద్ర, భావోద్వేగాలు):',
      freeTextPlaceholder: 'ఉదా: నాకు పీరియడ్స్ చాలా ఆలస్యంగా వస్తున్నాయి, ముఖంపై మొటిమలు మరియు నీరసంగా ఉంటుంది...',
      reviewTitle: 'గుర్తించబడిన లక్షణాల సమీక్ష',
      reviewSubtitle: 'రిపోర్ట్ రూపొందించే ముందు దిగువ వివరాలు సరైనవేనా అని సరిచూసుకోండి.',
      generateReportAction: 'ఆరోగ్య నివేదికను రూపొందించండి',
    },
    ai: {
      title: 'AI లక్షణాల విశ్లేషకం',
      subtitle: 'తెలుగులో మీ సమస్యను రాయండి. మా AI వ్యవస్థ లక్షణాలను గుర్తించి, భద్రతా నియమాలను తనిఖీ చేసి, సులభమైన భాషలో అవగాహన కల్పిస్తుంది.',
      inputPlaceholder: 'మీ లక్షణాలను ఇక్కడ రాయండి (ఉదా: నాకు 3 నెలల నుండి పీరియడ్స్ రాలేదు, గడ్డం వద్ద మొటిమలు మరియు కడుపు నొప్పిగా ఉంది...)',
      analyzeBtn: 'లక్షణాలను విశ్లేషించండి',
      analyzing: 'భద్రతా నిబంధనలతో విశ్లేషిస్తోంది...',
      selectLanguagePrompt: 'మీరు ఏ భాషలోనైనా రాయవచ్చు:',
      interpretationTitle: 'లక్షణాల విశ్లేషణ మరియు సారాంశం',
      extractedSymptoms: [],
      careCategoryIdentified: 'గుర్తించబడిన విభాగం',
      missingInfoPrompt: 'అదనపు వివరాలు అవసరం:',
      userReviewNotice: 'ఖచ్చితత్వం కోసం మీరు లక్షణాలను జోడించవచ్చు లేదా తీసివేయవచ్చు:',
      addSymptomPlaceholder: 'మరొక లక్షణాన్ని జోడించండి (ఉదా: పొత్తికడుపు బరువు)',
      addBtn: 'జోడించు',
      removeBtn: 'తొలగించు',
      urgentWarningTitle: 'అత్యవసర వైద్య సంరక్షణ హెచ్చరిక',
      verifiedSourcesTitle: 'ధృవీకరించబడిన వైద్య మూలాలు',
      viewGuidanceAction: 'మార్గదర్శకత్వం చూడండి',
    },
    analytics: {
      title: 'ఋతుచక్ర విశ్లేషణ డేటా',
      subtitle: 'మీరు నమోదు చేసిన పీరియడ్స్ వివరాల నుండి మాత్రమే రూపొందించిన వాస్తవ విశ్లేషణ.',
      avgCycleLength: 'సగటు చక్ర వ్యవధి',
      avgPeriodDuration: 'పీరియడ్ సగటు రోజుల వ్యవధి',
      recordedCycles: 'మొత్తం నమోదైన చక్రాలు',
      cycleLengthTrend: 'చక్ర వ్యవధి చరిత్ర (రోజుల్లో)',
      periodDurationTrend: 'పీరియడ్ రోజుల చరిత్ర (రోజుల్లో)',
      symptomFrequency: 'లక్షణాల తరచుదనం',
      realDataNote: 'ఈ విశ్లేషణ పూర్తిగా నమోదైన తేదీల ఆధారంగా మాత్రమే రూపొందించబడింది.',
      insufficientDataNotice: 'చక్ర వ్యవధిని లెక్కించడానికి కనీసం 2 పీరియడ్స్ రికార్డులు అవసరం.',
    },
    report: {
      title: 'వ్యక్తిగత మహిళా ఆరోగ్య అంచనా నివేదిక',
      tagline: 'చిన్న లక్షణాలు, పెద్ద సమాధానాలు.',
      badge: 'అధికారిక రహస్య క్లినికల్ సారాంశం',
      referenceId: 'నివేదిక సంఖ్య',
      generatedOn: 'రూపొందించిన తేదీ',
      coverSection: 'నివేదిక అవలోకనం',
      userReportedSection: 'విభాగం ౧: వినియోగదారు తెలిపిన సమాచారం',
      cycleHistorySection: 'విభాగం ౨: ఋతుచక్ర చరిత్ర & సరళి',
      symptomInterpretationSection: 'విభాగం ౩: లక్షణాల వివరణ',
      careGuidanceSection: 'విభాగం ౪: తదుపరి మార్గదర్శకత్వం & వైద్యులను అడగవలసిన ప్రశ్నలు',
      importantInfoSection: 'విభాగం ౫: ముఖ్యమైన వైద్య ప్రకటన',
      primaryConcern: 'ప్రధాన విభాగం',
      reportedSymptoms: 'ధృవీకరించిన లక్షణాలు',
      cycleLengthStat: 'గమనించిన చక్ర వ్యవధి',
      periodDurationStat: 'గమనించిన పీరియడ్ వ్యవధి',
      nextStepsTitle: 'సురక్షిత తదుపరి చర్యలు',
      questionsForDoctorTitle: 'వైద్యులను అడగవలసిన ముఖ్య ప్రశ్నలు',
      sourcesTitle: 'ధృవీకరించబడిన వైద్య పరిశోధనలు',
      downloadPdf: 'PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి',
      printReport: 'ప్రింట్ / PDF భద్రపరచండి',
      backToDashboard: 'డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి',
    },
    settings: {
      title: 'సెట్టింగ్‌లు & గోప్యతా నియంత్రణలు',
      languageHeading: 'భాష ఎంపిక',
      privacyHeading: 'డేటా గోప్యత',
      privacyDesc: 'నారీ AI మీ గోప్యతను కాపాడుతుంది. మీ ఆరోగ్య సమాచారం మీ బ్రౌజర్‌లో మాత్రమే సురక్షితంగా ఉంటుంది.',
      guestModeBadge: 'యాక్టివ్: ప్రైవేట్ గెస్ట్ మోడ్',
      clearDataBtn: 'నా మొత్తం డేటాను తొలగించు',
      clearDataConfirm: 'మీ పీరియడ్స్ రికార్డులు మరియు రిపోర్టులను పూర్తిగా తొలగించాలనుకుంటున్నారా? దీన్ని తిరిగి పొందలేరు.',
      close: 'మూసివేయి',
    },
    common: {
      yes: 'అవును',
      no: 'కాదు',
      save: 'భద్రపరచు',
      cancel: 'రద్దు చేయి',
      delete: 'తొలగించు',
      next: 'తరువాత',
      back: 'వెనుకకు',
      done: 'పూర్తయింది',
      required: 'తప్పనిసరి',
      optional: 'ఐచ్ఛికం',
      loading: 'లోడ్ అవుతోంది...',
      error: 'లోపం జరిగింది. మళ్ళీ ప్రయత్నించండి.',
      retry: 'మళ్ళీ ప్రయత్నించండి',
    },
  },
  hi: {
    brand: {
      name: 'नारी AI (NAARI AI)',
      tagline: 'छोटे लक्षण, बड़े समाधान।',
      subtagline: 'अपने मासिक धर्म चक्र को समझें। लक्षणों को जानें। आत्मविश्वास के साथ अगला कदम उठाएं।',
      shortDesc: 'मासिक धर्म चक्र और पीसीओएस (PCOS) देखभाल के लिए एक सुरक्षित, बहुभाषी स्वास्थ्य मंच।',
      nonDiagnosticDisclaimer: 'नारी AI केवल शैक्षिक स्वास्थ्य जानकारी और लक्षण मार्गदर्शन प्रदान करता है। यह किसी बीमारी का निदान नहीं करता और न ही डॉक्टर के परामर्श का विकल्प है।',
    },
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      cycleCare: 'मासिक चक्र देखभाल',
      pcosCare: 'पीसीओएस एक्सप्लोरर',
      aiInterpreter: 'लक्षण स्पष्टता AI',
      analytics: 'एनालिटिक्स',
      report: 'डॉक्टर-विजिट ब्रीफ (Brief)',
      language: 'भाषा',
      privacy: 'गोपनीयता',
      guestMode: 'अतिथि मोड (निजी)',
    },
    landing: {
      heroTitle: 'छोटे लक्षण, बड़े समाधान।',
      heroSubtitle: 'अपने मासिक धर्म चक्र के पैटर्न को समझें। पीसीओएस से जुड़े लक्षणों की जांच करें। सुरक्षित मार्गदर्शन प्राप्त करें और डॉक्टर से परामर्श के लिए व्यापक रिपोर्ट तैयार करें।',
      startAssessment: 'जांच शुरू करें',
      exploreCare: 'देखभाल मॉड्यूल देखें',
      cycleCardTitle: 'मासिक धर्म चक्र देखभाल',
      cycleCardDesc: 'पीरियड की तारीखें, रक्तस्राव और लक्षणों को ट्रैक करें और अपने वास्तविक चक्र की अवधि को सुरक्षित रूप से जानें।',
      cycleCardAction: 'चक्र ट्रैक करें',
      pcosCardTitle: 'पीसीओएस (PCOS) मूल्यांकन',
      pcosCardDesc: 'पीसीओएस से संबंधित लक्षणों को समझें और डॉक्टर से परामर्श के लिए बेहतर तैयारी करें।',
      pcosCardAction: 'पीसीओएस जांच शुरू करें',
      howItWorksTitle: 'नारी AI कैसे कार्य करता है?',
      howItWorksSubtitle: 'आपकी गोपनीयता को समर्पित 4 चरणों की स्वास्थ्य यात्रा',
      step1Title: '१. लक्षण बताएं',
      step1Desc: 'अपनी सरल भाषा में लक्षण लिखें या हमारे प्रश्नों के उत्तर दें।',
      step2Title: '२. जानकारी समझें',
      step2Desc: 'WHO और अंतरराष्ट्रीय चिकित्सा दिशानिर्देशों द्वारा समीक्षित प्रमाणित जानकारी।',
      step3Title: '३. सुरक्षित अगला कदम',
      step3Desc: 'जीवनशैली संबंधी सुझाव और डॉक्टर से पूछने योग्य आवश्यक प्रश्न प्राप्त करें।',
      step4Title: '४. व्यक्तिगत रिपोर्ट',
      step4Desc: 'डॉक्टर से साझा करने के लिए एक गोपनीय A4 स्वास्थ्य रिपोर्ट डाउनलोड करें।',
      trustTitle: 'चिकित्सकीय जिम्मेदारी और पूर्ण गोपनीयता',
      trustDesc: 'मरीजों की सुरक्षा हमारी सर्वोच्च प्राथमिकता है। नारी AI सुरक्षा नियमों का पालन करता है और कोई मनगढ़ंत निदान नहीं करता।',
      safetyFirstBadge: 'समीक्षित सुरक्षा प्रणाली',
      privacyBadge: '१००% निजी • अतिथि मोड समर्थित',
    },
    cycle: {
      title: 'मासिक धर्म चक्र देखभाल',
      subtitle: 'अपनी पीरियड की तारीखें और लक्षण दर्ज करें। लगातार दो पीरियड शुरू होने की तारीखों के बीच चक्र की अवधि की गणना की जाती है।',
      logPeriod: 'पीरियड प्रविष्टि दर्ज करें',
      editPeriod: 'प्रविष्टि संपादित करें',
      startDate: 'पीरियड शुरू होने की तारीख',
      endDate: 'पीरियड समाप्त होने की तारीख',
      flow: 'रक्तस्राव की मात्रा',
      flowLight: 'हल्का (Light)',
      flowModerate: 'मध्यम (Moderate)',
      flowHeavy: 'भारी (Heavy)',
      symptomsTitle: 'अनुभव किए गए लक्षण',
      symptomCramps: 'पेट दर्द / ऐंठन',
      symptomBloating: 'पेट फूलना (Bloating)',
      symptomHeadache: 'सिरदर्द',
      symptomMoodSwings: 'मूड में बदलाव',
      symptomFatigue: 'थकान और कमजोरी',
      symptomBackPain: 'कमर दर्द',
      symptomBreastTenderness: 'स्तनों में भारीपन',
      symptomAcne: 'मुंहासे (Acne)',
      notesPlaceholder: 'कोई अन्य टिप्पणी या विवरण जोड़ें...',
      saveEntry: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      deleteEntry: 'हटाएं',
      historyTitle: 'मासिक धर्म चक्र इतिहास',
      emptyHistory: 'अभी तक कोई रिकॉर्ड दर्ज नहीं है',
      emptyHistoryDesc: 'अपनी पहली प्रविष्टि जोड़ने के लिए ऊपर क्लिक करें। कम से कम 2 प्रविष्टियां होने पर सही चक्र अवधि की गणना होती है।',
      cycleLengthLabel: 'चक्र अवधि',
      durationLabel: 'पीरियड के दिन',
      daysUnit: 'दिन',
      cycleCalcNote: 'लगातार दो पीरियड शुरू होने की तारीखों के बीच के दिनों की गणना।',
      calendarTitle: 'कैलेंडर दृश्य',
      calendarLegendPeriod: 'दर्ज पीरियड के दिन',
      calendarLegendEstimated: 'संभावित आगामी दिन (केवल मार्गदर्शन हेतु)',
    },
    pcos: {
      title: 'पीसीओएस (PCOS) मूल्यांकन',
      subtitle: 'यह कोई चिकित्सीय निदान नहीं है, बल्कि आपके लक्षणों को समझने और डॉक्टर से परामर्श की तैयारी में मदद करने वाली एक मार्गदर्शिका है।',
      badgeNonDiagnostic: 'गैर-निदानात्मक नैदानिक अन्वेषण',
      step1Title: 'चक्र की नियमितता',
      step2Title: 'त्वचा और बालों में बदलाव',
      step3Title: 'अवधि और इतिहास',
      step4Title: 'समीक्षा और लक्षण',
      cycleRegularityQuestion: 'पिछले 6-12 महीनों में आपके मासिक चक्र का पैटर्न कैसा रहा है?',
      regular: 'नियमित (आमतौर पर हर 24–38 दिनों में)',
      irregularInfrequent: 'अनियमित या देर से (38 दिनों से अधिक, या महीने छूट जाना)',
      absentAmenorrhea: 'अनुपस्थित (लगातार 3 या अधिक महीनों से पीरियड न आना)',
      frequentShort: 'बहुत जल्दी (24 दिनों से पहले ही पीरियड आ जाना)',
      unsure: 'अनिश्चित / नियमित रूप से ट्रैक नहीं किया',
      skinChangesQuestion: 'क्या आपको लगातार मुंहासे या त्वचा में कालापन महसूस हुआ है?',
      skinNone: 'कोई विशेष मुंहासे नहीं',
      skinMild: 'हल्के मुंहासे',
      skinModerateSevere: 'गंभीर मुंहासे जो सामान्य स्किनकेयर से ठीक नहीं होते',
      skinCysticJawline: 'जबड़े और ठुड्डी के आसपास दर्दनाक गांठदार मुंहासे',
      hairChangesQuestion: 'क्या चेहरे या शरीर पर अनचाहे बाल बढ़ रहे हैं (Hirsutism)?',
      hairNone: 'चेहरे या शरीर पर अतिरिक्त बाल नहीं हैं',
      hairMildUpperLip: 'ऊपरी होंठ या ठुड्डी पर हल्के बाल',
      hairNoticeableChinChest: 'ठुड्डी, छाती या पेट पर स्पष्ट घने बाल',
      hairSignificant: 'काफी घने बाल जिन्हें बार-बार हटाना पड़ता है',
      scalpThinningQuestion: 'क्या सिर के बीच के हिस्से में बाल पतले होकर झड़ रहे हैं?',
      durationQuestion: 'आप ये लक्षण कितने समय से देख रही हैं?',
      lessThan3Months: '3 महीने से कम',
      threeToSixMonths: '3 से 6 महीने',
      sixToTwelveMonths: '6 से 12 महीने',
      moreThan12Months: '1 साल से अधिक समय से',
      priorEvaluationQuestion: 'क्या पहले कभी किसी डॉक्टर से हार्मोनल जांच कराई है?',
      priorNone: 'पहले कोई जांच नहीं कराई',
      priorSuspected: 'डॉक्टर ने पहले पीसीओएस का संदेह जताया था',
      priorDiagnosed: 'पहले पीसीओएस होने की पुष्टि हो चुकी है',
      priorUltrasound: 'पेल्विक अल्ट्रासाउंड स्कैन कराया हुआ है',
      freeTextPrompt: 'अपने शब्दों में कोई अन्य लक्षण बताएं (थकान, वजन, नींद, मनोदशा):',
      freeTextPlaceholder: 'उदा: मेरे पीरियड्स 40-50 दिनों में आते हैं, मुझे बहुत ज्यादा थकान और चेहरे पर मुंहासे रहते हैं...',
      reviewTitle: 'पहचाने गए लक्षणों की समीक्षा',
      reviewSubtitle: 'रिपोर्ट तैयार करने से पहले कृपया सुनिश्चित करें कि नीचे दिए गए लक्षण सही हैं।',
      generateReportAction: 'स्वास्थ्य रिपोर्ट तैयार करें',
    },
    ai: {
      title: 'AI लक्षण विश्लेषक',
      subtitle: 'हिंदी में अपने लक्षण लिखें। हमारा AI लक्षणों को पहचानता है, सुरक्षा नियमों की पुष्टि करता है, और सरल भाषा में समझाता है।',
      inputPlaceholder: 'अपने लक्षण यहां लिखें (उदा: मुझे 3 महीने से पीरियड नहीं आया है, जबड़े पर मुंहासे हैं और पेट में दर्द महसूस हो रहा है...)',
      analyzeBtn: 'लक्षणों का विश्लेषण करें',
      analyzing: 'सुरक्षा नियमों के साथ विश्लेषण किया जा रहा है...',
      selectLanguagePrompt: 'आप किसी भी समर्थित भाषा में लिख सकती हैं:',
      interpretationTitle: 'लक्षणों का विश्लेषण और सारांश',
      extractedSymptoms: [],
      careCategoryIdentified: 'पहचाना गया देखभाल क्षेत्र',
      missingInfoPrompt: 'आवश्यक अतिरिक्त जानकारी:',
      userReviewNotice: 'सटीकता के लिए आप लक्षणों को जोड़ या हटा सकती हैं:',
      addSymptomPlaceholder: 'अन्य लक्षण जोड़ें (उदा: पेल्विक भारीपन)',
      addBtn: 'जोड़ें',
      removeBtn: 'हटाएं',
      urgentWarningTitle: 'तत्काल चिकित्सा परामर्श चेतावनी',
      verifiedSourcesTitle: 'प्रमाणित चिकित्सा स्रोत',
      viewGuidanceAction: 'मार्गदर्शन देखें',
    },
    analytics: {
      title: 'मासिक चक्र विश्लेषण',
      subtitle: 'यह विश्लेषण केवल आपके द्वारा दर्ज की गई तारीखों पर आधारित है। कोई मनगढ़ंत आंकड़े नहीं।',
      avgCycleLength: 'औसत चक्र अवधि',
      avgPeriodDuration: 'पीरियड की औसत अवधि',
      recordedCycles: 'कुल दर्ज चक्र',
      cycleLengthTrend: 'चक्र अवधि का इतिहास (दिनों में)',
      periodDurationTrend: 'पीरियड दिनों का इतिहास (दिनों में)',
      symptomFrequency: 'लक्षणों की आवृत्ति',
      realDataNote: 'सभी आंकड़े लगातार दर्ज की गई शुरूआती तारीखों से ही लिए गए हैं।',
      insufficientDataNotice: 'चक्र की सही अवधि जानने के लिए कम से कम 2 पीरियड दर्ज होना आवश्यक है।',
    },
    report: {
      title: 'व्यक्तिगत महिला स्वास्थ्य मूल्यांकन रिपोर्ट',
      tagline: 'छोटे लक्षण, बड़े समाधान।',
      badge: 'आधिकारिक गोपनीय नैदानिक सारांश',
      referenceId: 'रिपोर्ट संदर्भ संख्या',
      generatedOn: 'तैयार करने की तिथि',
      coverSection: 'रिपोर्ट अवलोकन',
      userReportedSection: 'खंड १: उपयोगकर्ता द्वारा दी गई जानकारी',
      cycleHistorySection: 'खंड २: मासिक चक्र का इतिहास',
      symptomInterpretationSection: 'खंड ३: लक्षणों की व्याख्या',
      careGuidanceSection: 'खंड ४: मार्गदर्शन और डॉक्टर से पूछने योग्य प्रश्न',
      importantInfoSection: 'खंड ५: आवश्यक चिकित्सकीय सूचना एवं अस्वीकरण',
      primaryConcern: 'मुख्य देखभाल क्षेत्र',
      reportedSymptoms: 'पुष्टि किए गए लक्षण',
      cycleLengthStat: 'देखी गई चक्र अवधि',
      periodDurationStat: 'देखी गई पीरियड अवधि',
      nextStepsTitle: 'सुरक्षित अगले कदम',
      questionsForDoctorTitle: 'डॉक्टर से पूछने हेतु अनुशंसित प्रश्न',
      sourcesTitle: 'प्रमाणित चिकित्सा संदर्भ',
      downloadPdf: 'PDF रिपोर्ट डाउनलोड करें',
      printReport: 'प्रिंट / PDF सुरक्षित करें',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    },
    settings: {
      title: 'सेटिंग्स और गोपनीयता',
      languageHeading: 'भाषा चुनें',
      privacyHeading: 'डेटा गोपनीयता',
      privacyDesc: 'नारी AI आपकी गोपनीयता को सुरक्षित रखता है। आपकी स्वास्थ्य जानकारी केवल आपके ब्राउज़र में ही रहती है।',
      guestModeBadge: 'सक्रिय: निजी अतिथि मोड',
      clearDataBtn: 'मेरा सारा डेटा हटाएं',
      clearDataConfirm: 'क्या आप निश्चित रूप से अपना सभी रिकॉर्ड मिटाना चाहती हैं? इसे वापस नहीं लाया जा सकेगा।',
      close: 'बंद करें',
    },
    common: {
      yes: 'हाँ',
      no: 'नहीं',
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      next: 'आगे',
      back: 'पीछे',
      done: 'पूर्ण',
      required: 'आवश्यक',
      optional: 'वैकल्पिक',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई। कृपया पुनः प्रयास करें।',
      retry: 'पुनः प्रयास करें',
    },
  },
};
