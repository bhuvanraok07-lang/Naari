import { MedicalSource, CulturalGlossaryTerm } from '../types';

export const MEDICAL_SOURCES: MedicalSource[] = [
  {
    id: 'who-pcos-2023',
    name: 'WHO Fact Sheet on Polycystic Ovary Syndrome (PCOS)',
    organization: 'World Health Organization (WHO)',
    publicationYear: '2023',
    guidelineTitle: 'Polycystic ovary syndrome key facts and global clinical guidance',
    summary: 'Provides international consensus on PCOS prevalence (8-13% worldwide), diagnostic framework (Rotterdam consensus requiring at least 2 of 3 features), lifestyle management, and long-term cardiometabolic surveillance.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
    lastReviewed: 'October 2023',
    supportedContent: 'Endocrine foundation of PCOS, Rotterdam consensus criteria, non-diagnostic boundaries, metabolic risk education.'
  },
  {
    id: 'acog-aub-2021',
    name: 'ACOG Practice Bulletin No. 128 / 136: Abnormal Uterine Bleeding',
    organization: 'American College of Obstetricians and Gynecologists (ACOG)',
    publicationYear: 'Reaffirmed 2023',
    guidelineTitle: 'Diagnosis of Abnormal Uterine Bleeding in Reproductive-Aged Women',
    summary: 'FIGO PALM-COEIN classification system defining normal adult cycle length (24-38 days), normal bleeding duration (up to 8 days), and evaluation parameters for heavy or irregular bleeding.',
    url: 'https://www.acog.org',
    lastReviewed: 'November 2023',
    supportedContent: 'Adult normal cycle thresholds (24-38 days), heavy menstrual bleeding definitions (soaking 2+ pads/hr as red flag), dysmenorrhea.'
  },
  {
    id: 'monash-pcos-2023',
    name: 'International Evidence-based Guideline for PCOS 2023',
    organization: 'Monash University & International PCOS Network',
    publicationYear: '2023',
    guidelineTitle: 'Recommendations from the 2023 International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome',
    summary: 'Comprehensive global guidelines covering ovulatory dysfunction, clinical/biochemical hyperandrogenism, polycystic ovarian morphology, sleep apnea screening, adolescent diagnostic caution, and patient-centered education.',
    url: 'https://www.monash.edu/medicine/sphpm/m-ride/international-pcos-guideline',
    lastReviewed: 'August 2023',
    supportedContent: 'Adolescent life-stage considerations (delaying ultrasound diagnosis within 8 years of menarche), sleep apnea and snoring inquiry, mental health impact.'
  },
  {
    id: 'nhs-menstrual-2023',
    name: 'NHS Clinical Guidance: Heavy and Irregular Periods',
    organization: 'National Health Service (NHS UK)',
    publicationYear: '2023',
    guidelineTitle: 'Menstrual health, period pain, and indications for primary care referral',
    summary: 'Clinical indicators for secondary care referral including severe dysmenorrhea unresponsive to NSAIDs, intermenstrual bleeding, postcoital bleeding, and symptoms of severe anemia.',
    url: 'https://www.nhs.uk/conditions/periods/',
    lastReviewed: 'September 2023',
    supportedContent: 'Emergency escalation criteria, red-flag symptoms, syncope and acute bleeding referrals.'
  },
];

export const CULTURAL_GLOSSARY: CulturalGlossaryTerm[] = [
  {
    phrase: 'Kamzori (कमजोरी / ಕಮಜೋರಿ)',
    language: 'Hindi / Urdu / Kannada (cognate)',
    literalMeaning: 'Weakness, physical fatigue, lack of stamina or energy.',
    clinicalClarification: 'Commonly used to describe generalized fatigue or low energy. Clinically, fatigue can stem from iron deficiency/anemia (often secondary to heavy menstrual bleeding), thyroid variation, poor sleep, nutritional factors, or metabolic shifts. It is not indicative of any single illness.',
    importantBoundaries: 'Must be differentiated from sudden collapse or fainting (syncope), which is an urgent red flag.'
  },
  {
    phrase: 'Safed Pani (सफेद पानी) / Bili Seragu (ಬಿಳಿ ಸೆರಗು) / Tella Batta (తెల్ల బట్ట)',
    language: 'Hindi / Kannada / Telugu',
    literalMeaning: 'White discharge / vaginal discharge.',
    clinicalClarification: 'Physiological vaginal discharge is a normal and healthy bodily function that changes in consistency across the menstrual cycle (e.g. clearer and stretchy near ovulation, creamier during luteal phase). If accompanied by abnormal color (yellow/green), foul odor, burning, itching, or pelvic pain, a clinical swab by a healthcare provider may be required.',
    importantBoundaries: 'Vaginal infections or cervical conditions fall outside the scope of PCOS and cycle tracking. Do not attempt self-diagnosis or treat normal physiological discharge as abnormal.'
  },
  {
    phrase: 'Body feels hot / Tapa (ತಪ / तपन)',
    language: 'Multilingual colloquial',
    literalMeaning: 'Subjective feeling of internal warmth or hot sensations.',
    clinicalClarification: 'Subjective warmth can relate to luteal phase basal temperature rise (progesterone effect), thermal dysregulation, stress, or thyroid variation. True medical fever (>38°C / 100.4°F) with pelvic pain is an infection red flag.',
    importantBoundaries: 'Differentiate subjective sensation of warmth from acute febrile illness.'
  },
  {
    phrase: 'Heart feels heavy / Manassu Bhara (ಮನಸ್ಸು ಭಾರ / दिल भारी)',
    language: 'Kannada / Telugu / Hindi',
    literalMeaning: 'Emotional heaviness, feeling overwhelmed, burdened or anxious.',
    clinicalClarification: 'Menstrual cycle irregularities and visible symptoms of hyperandrogenism (such as facial hair, acne, hair thinning) frequently trigger profound psychological distress, body image distress, and social anxiety. This emotional burden is widely recognized in the 2023 International PCOS Guidelines.',
    importantBoundaries: 'Respond with deep empathy and compassion. Do not diagnose psychiatric disorders automatically.'
  },
  {
    phrase: 'Period is not coming properly',
    language: 'Everyday English / Vernacular',
    literalMeaning: 'Unpredictable, delayed, very light, or irregular menstruation.',
    clinicalClarification: 'Describes ovulatory variability where the ovarian cycle does not follow a predictable 24-38 day interval. A key marker to document across consecutive cycles.',
    importantBoundaries: 'Tracking 3 consecutive cycles provides objective data for the physician.'
  }
];

export const LIFE_STAGE_GUIDANCE = {
  adolescent: {
    label: 'Adolescent (12–19 years)',
    cycleIntervalRange: '21 to 45 days (often irregular in first 2–3 years post-menarche)',
    clinicalNotes: 'The hypothalamic-pituitary-ovarian (HPO) axis is maturing. Under the 2023 International PCOS Guidelines, adult criteria (24–38 days) must NOT be applied rigidly to adolescents. Ultrasound should generally not be used for diagnosis within 8 years of menarche due to multi-follicular ovaries being normal during adolescence.'
  },
  young_adult: {
    label: 'Young Adult (20–29 years)',
    cycleIntervalRange: '24 to 38 days',
    clinicalNotes: 'The HPO axis is mature. Cycles longer than 38 days or fewer than 8 periods a year suggest ovulatory dysfunction that warrants medical consultation.'
  },
  adult: {
    label: 'Adult (30–39 years)',
    cycleIntervalRange: '24 to 38 days',
    clinicalNotes: 'Consistent cycle tracking helps identify changes in flow or ovulatory consistency. Symptoms of hyperandrogenism or metabolic changes should be evaluated holistically.'
  },
  perimenopause: {
    label: 'Perimenopause (40+ years)',
    cycleIntervalRange: 'Variable; cycles may shorten or lengthen',
    clinicalNotes: 'Hormonal fluctuations naturally increase as ovarian reserve shifts. New or changing symptoms should be reviewed with a gynecologist.'
  },
  unspecified: {
    label: 'Standard Adult Reference',
    cycleIntervalRange: '24 to 38 days',
    clinicalNotes: 'Standard clinical reference interval according to ACOG.'
  }
};

export const EDUCATIONAL_TOPICS = {
  cycleBasics: {
    title: 'Understanding Your Menstrual Cycle',
    summary: 'A standard menstrual cycle typically ranges between 24 and 38 days in adults, counted from Day 1 of one period to Day 1 of the next period.',
    variabilityNote: 'Cycle lengths naturally fluctuate from month to month due to stress, travel, sleep changes, nutrition, or hormonal adjustments. Occasional variation is normal and does not indicate pathology.'
  },
  pcosBasics: {
    title: 'What is Polycystic Ovary Syndrome (PCOS)?',
    summary: 'PCOS is a common endocrine and metabolic condition affecting up to 8–13% of women of reproductive age worldwide.',
    rotterdamCriteria: 'Under the international Rotterdam Criteria (endorsed by WHO and Monash University 2023), diagnosis requires at least 2 of 3 features after ruling out other causes: 1) Irregular or absent ovulation, 2) Signs of excess androgens (acne, hirsutism, or elevated lab levels), 3) Polycystic appearance on ultrasound (in adult women).',
    differentialNotice: 'Symptoms such as irregular periods, acne, and hair thinning can also stem from thyroid conditions (hypo/hyperthyroidism), elevated prolactin, stress, or nutritional factors. Only a licensed physician can perform comprehensive differential lab tests.'
  },
  suggestedTrackingItems: [
    'First day of bleeding for each period',
    'Bleeding duration in consecutive days',
    'Flow intensity (light, moderate, heavy)',
    'Presence of cramps, lower back ache, or pelvic heaviness',
    'Facial acne flare-ups or changes in skin texture',
    'Noticeable changes in facial or body hair growth',
    'Energy levels and sleep disruptions'
  ],
  standardQuestionsForDoctor: [
    'How do my recorded cycle intervals compare to typical reference ranges for my life stage?',
    'Could my symptoms (cycle variation, skin changes, fatigue) be related to PCOS, thyroid function, or another endocrine condition?',
    'Would you recommend an ultrasound, hormone blood panel (FSH, LH, Total & Free Testosterone, TSH, Prolactin), or fasting glucose/insulin test?',
    'What evidence-based lifestyle or medical strategies would best support my cycle regularity and long-term well-being?'
  ],
  disclaimerText: 'NAARI AI provides educational health information and symptom guidance. It does not diagnose medical conditions, replace professional medical care, or prescribe treatment.'
};
